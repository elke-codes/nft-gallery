import NftList from "../components/NftList/NftList";
import SearchBar from "../components/SearchBar/SearchBar";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";

const GalleryPage = () => {
	const [nfts, setNfts] = useState([]);

	const [address, setAddress] = useState();

	const getNFTs = () => {
		axios
			.get(
				`https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`,
				{
					headers: {
						"X-API-KEY":
							"csUE0cmbWJageAjqXURl5CahhEgpObzsuCpE5bjBKRQl16ArCB556UmPPvv8qGj7"
					}
				}
			)
			.then((result) => {
				// const metadata = JSON.parse(result.data.result[0].metadata);
				// console.log(metadata.name);
				console.log(result.data.result);
				console.log(result.data);
				// this.setState({
				// 	nftData: result.data,
				// 	nftMetaData: result.data.result.map((nft) => {
				// 		return JSON.parse(nft.metadata);
				// 	})
				// });
				setNfts(result.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getNFTs();
	}, [address]);

	const handleSearch = (address) => {
		setAddress(address);
	};
	// componentDidUpdate(prevProps){
	// 	if (prevProps.address !== this.address){

	// 	}
	// }

	console.log("render");

	return (
		<main>
			<div className="search-container">
				<SearchBar onSearch={handleSearch} />
				{address && <h2>Searching nft s on address: {address}</h2>}
			</div>
			{nfts && <NftList nfts={nfts} />}
		</main>
	);
};

export default GalleryPage;

// state = {
// 	address: "",
// 	nftData: null,
// 	nftMetaData: null
// };

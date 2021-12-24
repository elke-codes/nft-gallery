import NftList from "../components/NftList/NftList";
import SearchBar from "../components/SearchBar/SearchBar";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { getNfts } from "../utils/getNfts";

const GalleryPage = () => {
	const [nfts, setNfts] = useState([]);
	const [totalCount, setTotalCount] = useState();
	const [address, setAddress] = useState();

	useEffect(async () => {
		// destructuring is the same as writing const nftResponse = getNFTS(address) and then below using nftResponse.nfts, but destructuring is easier. our getNFTsfunction returns us an object so we need toa ccess the properties of that object either via destructuring or dot notation to use the response. this is the same as calling axios.get and geting back `resolve.data`, right? you can say `const {data } = resolve, or `const data = resolve.data`.
		const { nfts, totalCount } = await getNfts(address);
		console.log("NFTS", nfts, "TOTAL COUNT", totalCount);
		setNfts(nfts);
		setTotalCount(totalCount);
	}, [address]);

	const handleSearch = (address) => {
		setAddress(address);
	};

	console.log("render");

	return (
		<main>
			<div className="search-container">
				<SearchBar onSearch={handleSearch} />
				{address && <h2>Searching nft s on address: {address}</h2>}
			</div>
			{nfts && <NftList nfts={nfts} totalCount={totalCount} />}
		</main>
	);
};

export default GalleryPage;

import NftList from "../components/NftList/NftList";
import SearchBar from "../components/SearchBar/SearchBar";

import React, { Component, useEffect, useState } from "react";
import { getNfts } from "../utils/getNfts";
import CelebrityList from "../components/CelebrityList/CelebrityList";
import "./GalleryPage.scss";

const GalleryPage = () => {
	const [nfts, setNfts] = useState([]);
	const [totalCount, setTotalCount] = useState();
	const [address, setAddress] = useState();
	const [celebrity, setCelebrity] = useState();

	useEffect(async () => {
		// destructuring is the same as writing const nftResponse = getNFTS(address) and then below using nftResponse.nfts, but destructuring is easier. our getNFTsfunction returns us an object so we need toa ccess the properties of that object either via destructuring or dot notation to use the response. this is the same as calling axios.get and geting back `resolve.data`, you can say `const {data } = resolve, or `const data = resolve.data`.
		const { nfts, totalCount } = await getNfts(address);
		console.log("NFTS", nfts, "TOTAL COUNT", totalCount);
		setNfts(nfts);
		setTotalCount(totalCount);
	}, [address]);

	const handleSearch = (address, celebrity) => {
		setAddress(address);
		setCelebrity(celebrity);
	};

	console.log("render");

	return (
		<>
			<main className="gallery">
				<section className="gallery__celebrities">
					<CelebrityList onSearch={handleSearch} />
				</section>
				<div className="gallery__main-container">
					<div className="gallery__search-container">
						<SearchBar onSearch={handleSearch} />
						{address && (
							<h2>Searching nft s on address: {address}</h2>
						)}
						{/* if current address  = a celebrity address : show "showing celebrity.name+'s collection" */}
						{celebrity && <h2>Showing nft s from {celebrity}</h2>}
					</div>
					<section className="gallery__gallery">
						{nfts && (
							<NftList nfts={nfts} totalCount={totalCount} />
						)}
					</section>
				</div>
			</main>
		</>
	);
};

export default GalleryPage;

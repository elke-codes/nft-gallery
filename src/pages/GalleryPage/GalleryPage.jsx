import NftList from "../../components/NftList/NftList";
import SearchBar from "../../components/SearchBar/SearchBar";

import React, { Component, useEffect, useState } from "react";
import { getNfts } from "../../utils/getNfts";
import CelebrityList from "../../components/CelebrityList/CelebrityList";
import "./GalleryPage.scss";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";

const GalleryPage = () => {
	const [nfts, setNfts] = useState([]);
	const [totalCount, setTotalCount] = useState();
	const [address, setAddress] = useState();
	const [celebrity, setCelebrity] = useState();

	const [displayedNfts, setDisplayedNfts] = useState([]);
	const batchSize = 20;
	const [currentIndex, setCurrentIndex] = useState(0);

	const getNftsToDisplay = () => {
		if (!nfts.length) {
			console.log("no length of all nfts, exiting early");
			return;
		}

		const nextNfts = nfts.slice(currentIndex, batchSize);
		console.log("nextnfts", nextNfts);
		console.log("displayedNfts1", displayedNfts);
		setDisplayedNfts(displayedNfts.concat(nextNfts));
		console.log("displayedNfts2", displayedNfts);
		setCurrentIndex(currentIndex + batchSize);
	};

	useEffect(async () => {
		const { nfts, totalCount } = await getNfts(address);
		console.log("NFTS", nfts, "TOTAL COUNT", totalCount);
		setNfts(nfts);
		setTotalCount(totalCount);
	}, [address]);

	useEffect(() => {
		getNftsToDisplay();
	}, [nfts]);

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
					</div>
					<div className="gallery__found-info">
						{/* if current address  = a celebrity address : show "showing celebrity.name+'s collection" */}
						{celebrity && (
							<h2 className="gallery__found-info-celebrity">
								{celebrity}'s Nft Collection
							</h2>
						)}
						{address && (
							<>
								<p>
									<span className="gallery__found-info--bold">
										ETH address:{" "}
									</span>
									{address}
								</p>
								<p>
									<span className="gallery__found-info--bold">
										Total NFT found on this ETH address:{" "}
									</span>
									{totalCount}
								</p>
							</>
						)}
					</div>
					<section className="gallery__gallery">
						{displayedNfts && (
							<NftList
								nfts={displayedNfts}
								totalCount={totalCount}
							/>
						)}
						<ScrollUpButton />
					</section>
				</div>
			</main>
		</>
	);
};

export default GalleryPage;

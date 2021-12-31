/// GALLERYPAGE.JSX ///

import NftList from "../../components/NftList/NftList";
import SearchBar from "../../components/SearchBar/SearchBar";

import React, { Component, useEffect, useState } from "react";
import { getNfts } from "../../utils/getNfts";
import CelebrityList from "../../components/CelebrityList/CelebrityList";
import "./GalleryPage.scss";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import useInfiniteScroll from "../../utils/useInfitniteScroll";
import ScrollDownButton from "../../components/ScrollDownButton/ScrollDownButton";

const GalleryPage = () => {
	const handleSearch = (address, celebrity) => {
		setAddress(address);
		setCelebrity(celebrity);
	};
	const [allNfts, setAllNfts] = useState([]);
	const [totalCount, setTotalCount] = useState();
	const [address, setAddress] = useState();
	const [celebrity, setCelebrity] = useState();

	const [displayedNfts, setDisplayedNfts] = useState([]);
	const batchSize = 20;
	const [currentIndex, setCurrentIndex] = useState(0);

	const getNftsToDisplay = () => {
		if (!allNfts.length) {
			console.log("no length of all nfts, exiting early");
			return;
		}
		const nextNfts = allNfts.slice(currentIndex, currentIndex + batchSize);
		setDisplayedNfts(displayedNfts.concat(nextNfts));
		setCurrentIndex(currentIndex + batchSize);
		setIsFetching(false);
	};

	const [isFetching, setIsFetching] = useInfiniteScroll(getNftsToDisplay);

	//when the address changes, wait for the api call to resolve then use that data to start populating the component
	useEffect(async () => {
		//when the address changes, reset the current index and displayednfts
		setCurrentIndex(0);
		setDisplayedNfts([]);
		//call the api to fetch the nfts for the current address
		const { nfts, totalCount } = await getNfts(address);
		//store all nfts fetched from the api in state
		setAllNfts(nfts);

		setTotalCount(totalCount);
	}, [address]);

	useEffect(() => {
		getNftsToDisplay();
	}, [allNfts]);

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
							<NftList displayedNfts={displayedNfts} />
						)}
						<ScrollUpButton />
						<ScrollDownButton />
					</section>
				</div>
			</main>
		</>
	);
};

export default GalleryPage;

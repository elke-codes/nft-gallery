import NftList from "../../components/NftList/NftList";
import SearchBar from "../../components/SearchBar/SearchBar";

import React, { Component, useEffect, useState } from "react";
import { getNfts } from "../../utils/getNfts";
import CelebrityList from "../../components/CelebrityList/CelebrityList";
import "./GalleryPage.scss";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import useInfiniteScroll from "../../utils/useInfitniteScroll";
import ScrollDownButton from "../../components/ScrollDownButton/ScrollDownButton";
import { Grid, Triangle } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const GalleryPage = () => {
	const handleSearch = (address) => {
		if (!address) return;
		console.log("addrsss handlesearch gallerypage", address);
		setAddress(address);
		setLoadingNfts(true);
	};

	const [allFetchedNfts, setAllFetchedNfts] = useState([]);
	const [totalCount, setTotalCount] = useState();
	const [address, setAddress] = useState();
	// const [celebrity, setCelebrity] = useState();

	const [displayedNfts, setDisplayedNfts] = useState([]);
	const batchSize = 20;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loadingNfts, setLoadingNfts] = useState(false);
	const [cursor, setCursor] = useState("");
	const hasMore = totalCount > displayedNfts.length;

	const getNftsToDisplay = () => {
		if (!allFetchedNfts.length) {
			console.log("no length of all nfts, exiting early");
			return;
		}
		if (displayedNfts.length === allFetchedNfts.length) {
			console.log(
				"displayedNfts.length === allFetchedNfts.length returning"
			);
			return;
		}
		const nextNfts = allFetchedNfts.slice(
			currentIndex,
			currentIndex + batchSize
		);
		setDisplayedNfts(displayedNfts.concat(nextNfts));
		setCurrentIndex(currentIndex + batchSize);
		// setIsFetching(false);
	};

	// const [isFetching, setIsFetching] = useInfiniteScroll(getNftsToDisplay);

	//when the address changes, wait for the api call to resolve then use that data to start populating the component
	useEffect(async () => {
		if (!address) return;
		//when the address changes, reset the current index and displayednfts
		setCurrentIndex(0);
		setDisplayedNfts([]);
		//call the api to fetch the nfts for the current address
		// TODO ERROR HANDLING MESSAGE TO USERS
		const { nfts, totalCount, cursor } = await getNfts(address);
		//store all nfts fetched from the api in state
		setAllFetchedNfts(nfts);
		setLoadingNfts(false);
		setTotalCount(totalCount);
		setCursor(cursor);
	}, [address]);

	useEffect(() => {
		getNftsToDisplay();
	}, [allFetchedNfts]);

	// const loadingNftsState = (inputFromSearch) => {
	// 	console.log("loading nft state called");
	// 	setLoadingNfts(inputFromSearch);
	// };

	// console.log("loadingNfts", loadingNfts);

	return (
		<>
			{console.log("rendering")}
			<main className="gallery">
				<div className="gallery__main-container">
					<div className="gallery__search-container">
						<SearchBar
							onSearch={handleSearch}
							address={address}
							// loadingNftsState={() => {
							// 	loadingNftsState();
							// }}
						/>
					</div>
					{address && loadingNfts && (
						<>
							<Triangle
								type="Triangle"
								color="black"
								height={80}
								width={80}
							/>

							<p>Loading NFTs ...</p>
						</>
					)}

					<div className="gallery__found-info">
						{!loadingNfts && address && (
							<>
								<p className="gallery__found-info--bold">
									ETH address:{" "}
								</p>
								<p> {address}</p>
								<p className="gallery__found-info--bold">
									Total NFT found on this address:{" "}
								</p>

								<p> {totalCount}</p>
							</>
						)}
					</div>
					<InfiniteScroll
						dataLength={displayedNfts.length}
						next={getNftsToDisplay}
						hasMore={hasMore}
						style={{ overflow: " unset", paddingBottom: "3rem" }}
						// loader={<h4>loadingNfts...</h4>}

						endMessage={
							displayedNfts.length > 0 && (
								<p
									style={{
										textAlign: "center",
										paddingTop: "2rem"
									}}>
									<b>Yay! You have seen it all</b>
								</p>
							)
						}>
						<section className="gallery__gallery">
							{displayedNfts && (
								<NftList displayedNfts={displayedNfts} />
							)}
							<ScrollUpButton />
							<ScrollDownButton />
						</section>
					</InfiniteScroll>
				</div>
			</main>
		</>
	);
};

export default GalleryPage;

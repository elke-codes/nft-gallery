import NftList from "../../components/NftList/NftList";
import SearchBar from "../../components/SearchBar/SearchBar";

import React, { useEffect, useState } from "react";
import { getNfts } from "../../utils/getNfts";
import "./GalleryPage.scss";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import ScrollDownButton from "../../components/ScrollDownButton/ScrollDownButton";
import { Triangle } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const GalleryPage = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const handleSearch = (address) => {
		// if (!address) {
		// 	setErrorMessage("Please enter and address");
		// 	return;
		// }
		setErrorMessage("");
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
	// const [errorMessage, setErrorMessage] = useState("");
	const [resolvingEns, setResolvingEns] = useState(false);

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
		const { nfts, totalCount, cursor, axiosErrorMessage } = await getNfts(
			address
		);
		console.log("axioserrormessage", axiosErrorMessage);
		if (axiosErrorMessage) {
			setErrorMessage(axiosErrorMessage);
			setLoadingNfts(false);
			setResolvingEns(false);
			return;
		}
		//store all nfts fetched from the api in state
		setAllFetchedNfts(nfts);
		setLoadingNfts(false);
		setTotalCount(totalCount);
		setCursor(cursor);
	}, [address]);

	useEffect(() => {
		getNftsToDisplay();
	}, [allFetchedNfts]);

	return (
		<>
			<main className="gallery">
				<div className="gallery__main-container">
					<div className="gallery__search-container">
						<SearchBar
							onSearch={handleSearch}
							address={address}
							resolvingEns={resolvingEns}
							setResolvingEns={setResolvingEns}
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
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
					{resolvingEns && (
						<>
							<Triangle type="Triangle" height={80} width={80} />
							<p>Resolving address... </p>
						</>
					)}
					{!resolvingEns && !loadingNfts && address && (
						<div className="gallery__found-info">
							<>
								<p className="gallery__found-info--bold">
									ETH address:{" "}
								</p>
								<p> {address}</p>
								{!errorMessage && (
									<p className="gallery__found-info--bold">
										Total NFT found on this address:{" "}
									</p>
								)}

								<p> {totalCount}</p>
							</>
						</div>
					)}
					{/* {!errorMessage && (
						<p className="errormessage">{errorMessage}</p>
					)} */}

					<InfiniteScroll
						dataLength={displayedNfts.length}
						next={getNftsToDisplay}
						hasMore={hasMore}
						style={{
							overflow: " unset",
							paddingBottom: "3rem"
						}}
						// loader={<h4>loadingNfts...</h4>}

						endMessage={
							displayedNfts.length > 0 && (
								<p
									style={{
										textAlign: "center",
										paddingTop: "2rem"
									}}>
									<b>Yay! You have seen it all !</b>
								</p>
							)
						}>
						<section className="gallery__gallery">
							{displayedNfts && (
								// !errorMessage &&
								// !loadingNfts &&
								// !resolvingEns &&
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

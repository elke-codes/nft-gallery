import React, { useEffect, useState } from "react";
import "./CelebrityPage.scss";
import CelebrityList from "../../components/CelebrityList/CelebrityList";
import useInfiniteScroll from "../../utils/useInfitniteScroll";
import { getNfts } from "../../utils/getNfts";
import NftList from "../../components/NftList/NftList";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import ScrollDownButton from "../../components/ScrollDownButton/ScrollDownButton";
import celebrityData from "../../data/celebrities.json";
import { Triangle } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const CelebrityPage = () => {
	// const handleSearch = (e) => {
	// 	e.preventDefault();
	// 	console.log("handleSearch e.target", e.target);
	// 	console.log("celebrity", celebrity);
	// 	// setAddress(address);
	// 	// setCelebrity(celebrity);
	// };

	const handleChange = (e) => {
		e.preventDefault();
		setTotalCount(0);
		setCelebrity(e.target.value);
		const celebrityAll = celebrityData.find((celebrity) => {
			return celebrity.name === e.target.value;
		});

		setAddress(celebrityAll.address);
		setLoading(true);
	};

	const [allNfts, setAllNfts] = useState([]);
	const [totalCount, setTotalCount] = useState();
	const [address, setAddress] = useState();
	const [celebrity, setCelebrity] = useState();

	const [displayedNfts, setDisplayedNfts] = useState([]);
	const batchSize = 20;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	const getNftsToDisplay = () => {
		console.log("getting nfts to display");
		if (!allNfts.length) {
			// console.log("no length of all nfts, exiting early");
			return;
		}
		const nextNfts = allNfts.slice(currentIndex, currentIndex + batchSize);
		setDisplayedNfts(displayedNfts.concat(nextNfts));
		setCurrentIndex(currentIndex + batchSize);
		// setIsFetching(false);
	};

	// const [isFetching, setIsFetching] = useInfiniteScroll(getNftsToDisplay);

	//when the address changes, wait for the api call to resolve then use that data to start populating the component
	useEffect(async () => {
		//avoid api call on page load
		if (!address) return;
		//when the address changes, reset the current index and displayednfts
		setCurrentIndex(0);
		setDisplayedNfts([]);
		//call the api to fetch the nfts for the current address
		const { nfts, totalCount } = await getNfts(address);
		// console.log("got all nfts");
		//store all nfts fetched from the api in state
		setAllNfts(nfts);
		setLoading(false);

		setTotalCount(totalCount);
	}, [address]);

	useEffect(() => {
		getNftsToDisplay();
	}, [allNfts]);

	return (
		<section className="celebrities">
			{/* <CelebrityList onSearch={handleSearch} /> */}
			<article className="celebrities__dropdown">
				{!address && <h2>Check out these celebrities' NFTs</h2>}
				<select
					className="celebrities__select"
					value={celebrity}
					onChange={handleChange}>
					<option value="select">---select celebrity---</option>
					{celebrityData.map((celebrity) => {
						return (
							<option value={celebrity.name}>
								{celebrity.name}
							</option>
						);
					})}
				</select>
			</article>

			{celebrity && (
				// {/* if current address  = a celebrity address : show "showing celebrity.name+'s collection" */}

				<article className="celebrities__gallery">
					{/* if current address  = a celebrity address : show "showing celebrity.name+'s collection" */}
					<h2 className="gallery__found-info-celebrity">
						{celebrity === "select"
							? "Select a celebrity from the list to see their gallery"
							: `${celebrity}'s Nft Collection`}
					</h2>
					{totalCount !== 0 && (
						<p>{totalCount} NFT's found on ETH address:</p>
					)}
					{address && (
						<>
							<p>{address}</p>
						</>
					)}

					{loading && (
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

					<article className="gallery__gallery">
						{celebrity !== "select" && displayedNfts && (
							<NftList displayedNfts={displayedNfts} />
						)}
						<ScrollUpButton />
						<ScrollDownButton />
					</article>

					<InfiniteScroll
						dataLength={displayedNfts.length} //This is important field to render the next data
						next={getNftsToDisplay}
						hasMore={true}
						loader={<h4>Loading...</h4>}
						endMessage={
							<p style={{ textAlign: "center" }}>
								<b>Yay! You have seen it all</b>
							</p>
						}
						// // below props only if you need pull down functionality
						// refreshFunction={this.refresh}
						// pullDownToRefresh
						// pullDownToRefreshThreshold={50}
						// pullDownToRefreshContent={
						// 	<h3 style={{ textAlign: "center" }}>
						// 		&#8595; Pull down to refresh
						// 	</h3>
						// }
						// releaseToRefreshContent={
						// 	<h3 style={{ textAlign: "center" }}>
						// 		&#8593; Release to refresh
						// 	</h3>
						// }
					>
						{<NftList displayedNfts={displayedNfts} />}
					</InfiniteScroll>
				</article>
			)}
		</section>
	);
};

export default CelebrityPage;

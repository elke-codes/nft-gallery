import React, { useEffect, useState } from "react";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";

const NftList = (props) => {
	console.log("nftlist props", props.nfts.result);

	return (
		<>
			{props.nfts && (
				<>
					<div>
						Total NFT found on this ETH address: {props.totalCount}
					</div>
					<ul className="cards">
						{props.nfts.map((nft) => {
							return <NftCard nft={nft} />;
						})}
					</ul>
				</>
			)}
		</>
		// <ul className="cards">
		// 	{props.nftData &&
		// 		props.nftData.map((nft) => {
		// 			const metadata = JSON.parse(nft.metadata);

		// 			<li>
		// 				{console.log("parsed metadata:", metadata.image)}
		// 				<a href="" className="card">
		// 					<img
		// 						src={metadata.image}
		// 						className="card__image"
		// 						alt=""
		// 					/>
		// 					<div className="card__overlay">
		// 						<div className="card__header">
		// 							<svg
		// 								className="card__arc"
		// 								xmlns="http://www.w3.org/2000/svg">
		// 								<path />
		// 							</svg>
		// 							{/* <img
		// 						className="card__thumb"
		// 						src="https://i.imgur.com/7D7I6dI.png"
		// 						alt=""
		// 					/> */}
		// 							<div className="card__header-text">
		// 								<h3 className="card__title">
		// 									{metadata.name}
		// 								</h3>
		// 								{/* <span className="card__status">1 hour ago</span> */}
		// 							</div>
		// 						</div>
		// 						<p className="card__description">
		// 							{metadata.description}
		// 						</p>
		// 					</div>
		// 				</a>
		// 			</li>;
		// 		})}
		// </ul>
	);
};

export default NftList;

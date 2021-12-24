import React, { useEffect, useState } from "react";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";

const NftList = (props) => {
	console.log("nftlist props", props.nfts.result);
	const IPFS_GATEWAY_PREFIX = "https://ipfs.io/";

	return (
		<>
			{props.nfts.result && (
				<>
					<div>
						Total NFT found on this ETH address: {props.nfts.total}
					</div>
					<ul className="cards">
						{props.nfts.result.map((nft) => {
							// console.log("in loop", nft);
							let metadata;
							if (nft.metadata) {
								metadata = JSON.parse(nft.metadata);
							}

							let imageSrc;
							if (metadata && metadata.image) {
								if (metadata.image.startsWith("ipfs://")) {
									imageSrc =
										IPFS_GATEWAY_PREFIX +
										metadata.image.slice(7);
								} else {
									imageSrc = metadata.image;
								}
							} else {
								imageSrc = "https://plchldr.co/i/300x250";
							}

							return (
								<li>
									<a href="" className="card">
										<h2 className="card__collection-name">
											{nft.name ? nft.name : null}
										</h2>

										<img
											src={imageSrc}
											className="card__image"
											alt=""
										/>
										<div className="card__overlay">
											<div className="card__header">
												<svg
													className="card__arc"
													xmlns="http://www.w3.org/2000/svg">
													<path />
												</svg>
												{/* <img
													className="card__thumb"
													src="https://i.imgur.com/7D7I6dI.png"
													alt=""
												/> */}

												<div className="card__header-text">
													<h3 className="card__title">
														{metadata &&
														metadata.name
															? metadata.name
															: null}
													</h3>
													{/* <span className="card__status">
														1 hour ago
													</span> */}
												</div>
											</div>
											<p className="card__description">
												{metadata &&
												metadata.description
													? metadata.description
													: "no description for this NFT"}
											</p>
										</div>
									</a>
								</li>
							);
						})}
					</ul>
					{/* <NftCard nftData={props.nfts} /> */}
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

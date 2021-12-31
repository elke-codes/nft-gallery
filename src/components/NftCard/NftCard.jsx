/// NFTCARD.JSX ///

import React from "react";
import "./NftCard.scss";

const NftCard = (props) => {
	return (
		<>
			<li className="card">
				{/* <a href=""> */}
				<h2 className="card__collection-name">
					{props.nft.name ? props.nft.name : null}
				</h2>

				<img src={props.nft.imageSrc} className="card__image" alt="" />
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
								{props.nft.metadata && props.nft.metadata.name
									? props.nft.metadata.name
									: null}
							</h3>
							{/* <span className="card__status">
														1 hour ago
													</span> */}
						</div>
					</div>
					<p className="card__description">
						{props.nft.metadata && props.nft.metadata.description
							? props.nft.metadata.description
							: "no description for this NFT"}
					</p>
				</div>
				{/* </a> */}
			</li>
		</>
	);
};

export default NftCard;

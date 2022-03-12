import React from "react";
import "./NftCard.scss";

const NftCard = (props) => {
	return (
		<>
			<li className="card">
				<h2 className="card__title">
					{" "}
					{props.nft.metadata && props.nft.metadata.name
						? props.nft.metadata.name
						: null}
				</h2>
				<img
					src={props.nft.imageSrc}
					className="card__image"
					alt={
						props.nft.metadata && props.nft.metadata.name
							? props.nft.metadata.name
							: null
					}
				/>
				<div className="card__overlay">
					<div className="card__header">
						<svg
							className="card__arc"
							xmlns="http://www.w3.org/2000/svg">
							<path />
						</svg>
						<div className="card__header-text">
							<h3 className="card__collection-name">
								{props.nft.name ? props.nft.name : null}
							</h3>
							<p> &#8964;</p>
						</div>
					</div>
					<p className="card__description">
						{props.nft.metadata && props.nft.metadata.description
							? props.nft.metadata.description
							: "no description for this NFT"}
					</p>
				</div>
			</li>
		</>
	);
};

export default NftCard;

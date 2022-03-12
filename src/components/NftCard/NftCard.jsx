import React from "react";
import { Link } from "react-router-dom";
import "./NftCard.scss";

const NftCard = (props) => {
	return (
		<>
			<li className="card">
				<h2 className="card__title">
					{" "}
					{props.index}
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
					<div className="card__button-container">
						<button className="card__button">
							<a
								href={`https://opensea.io/assets/${props.nft.token_address}/${props.nft.token_id}`}
								target="_blank">
								View on OpenSea
							</a>
						</button>
					</div>
				</div>
			</li>
		</>
	);
};

export default NftCard;

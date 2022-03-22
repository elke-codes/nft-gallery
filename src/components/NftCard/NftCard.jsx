import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { transformMetadataUri } from "../../utils/transformMetadataUri";
import "./NftCard.scss";

const SOURCE_TYPE_IMAGE = "image";
const SOURCE_TYPE_AUDIO = "audio";
const SOURCE_TYPE_VIDEO = "video";
const SOURCE_TYPE_3D = "3D";

const NftCard = (props) => {
	console.log("nftcard props ", props, props.index);
	const [contentType, setContentType] = useState("");
	const [sourceType, setSourceType] = useState("");
	const [showDescription, setShowDescription] = useState(null);

	useEffect(async () => {
		// we need to check if props.nft.metadata && props.nft.metadata.animation_url exist, and if they do, we actually want to check  THAT
		// contentType INSTEAD of the image one.
		const url =
			props.nft.metadata && props.nft.metadata.animation_url
				? transformMetadataUri(props.nft.metadata.animation_url)
				: props.nft.imageSrc;

		// const {sourcetype, contenttype} = await getsourcetype()
		// setcontenttype(contenttype)
		// setsourcetype(sourcetype)

		try {
			const resp = await axios.head(url);
			const contentType = resp.headers["content-type"];
			// console.log(
			// 	"axios response nft card header",
			// 	props.index,
			// 	resp,
			// 	props.index,
			// 	props.nft.metadata.name,
			// 	contentType
			// );
			// console.log("ContentType", contentType);

			// contenType will be "image/png", "image/joeg", "video/mp4", "audio/mp3", etcera;
			if (contentType.includes("image")) {
				setSourceType(SOURCE_TYPE_IMAGE);
			} else if (contentType.includes("video")) {
				setSourceType(SOURCE_TYPE_VIDEO);
			} else if (contentType.includes("audio")) {
				setSourceType(SOURCE_TYPE_AUDIO);
			} else if (contentType.includes("glb")) {
				setSourceType(SOURCE_TYPE_3D);
			} else {
				setSourceType(SOURCE_TYPE_IMAGE);
			}

			setContentType(contentType);
		} catch (e) {
			// everything that fails the contenttype looked will be an image
			setSourceType(SOURCE_TYPE_IMAGE);
			// console.log("axios head error", e);
		}
	}, []);

	return (
		<>
			<li className="card">
				<h2 className="card__title">
					{props.nft.metadata && props.nft.metadata.name
						? props.nft.metadata.name
						: null}
				</h2>
				{/* okay, we need to iterate over the sourceType prop and determine whether we are rendering  an image, video, audio, or 3d */}
				{sourceType === SOURCE_TYPE_IMAGE && (
					<img
						src={props.nft.imageSrc}
						className="card__image"
						alt={
							props.nft.metadata && props.nft.metadata.name
								? props.nft.metadata.name
								: null
						}
					/>
				)}

				{sourceType === SOURCE_TYPE_VIDEO && (
					<video
						controls
						controlsList="nodownload"
						// crossOrigin="anonymous"
					>
						<source
							src={
								props.nft.metadata &&
								props.nft.metadata.animation_url
									? transformMetadataUri(
											props.nft.metadata.animation_url
									  )
									: props.nft.imageSrc
							}
							type={contentType}
						/>
					</video>
				)}
				{sourceType === SOURCE_TYPE_AUDIO && (
					<>
						<img
							src={props.nft.imageSrc}
							className="card__image"
							alt={
								props.nft.metadata && props.nft.metadata.name
									? props.nft.metadata.name
									: null
							}
						/>
						<audio
							controls
							type={contentType}
							src={transformMetadataUri(
								props.nft.metadata.animation_url
							)}
						/>
					</>
				)}
				<div className="card__overlay">
					<div className="card__header">
						{/* <svg
							className="card__arc"
							xmlns="http://www.w3.org/2000/svg">
							<path />
						</svg> */}
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

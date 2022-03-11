import React from "react";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";
import { v4 as uuid } from "uuid";

const NftList = (props) => {
	// console.log("nftlist props", props);
	return (
		<>
			{props.displayedNfts.length > 0 && (
				<ul className="cards">
					{props.displayedNfts.map((nft) => {
						// console.log("mapping");
						return <NftCard nft={nft} key={uuid()} />;
					})}
				</ul>
			)}
		</>
	);
};

export default NftList;

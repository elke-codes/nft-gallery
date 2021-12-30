import React, { useEffect, useState } from "react";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";

const NftList = (props) => {
	console.log("from nftlist", props);
	return (
		<>
			{props.nfts.length > 0 && (
				<ul className="cards">
					{props.nfts.map((nft) => {
						return <NftCard nft={nft} />;
					})}
				</ul>
			)}
		</>
	);
};

export default NftList;

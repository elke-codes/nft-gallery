import React, { useEffect, useState } from "react";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";

const NftList = (props) => {
	return (
		<>
			{props.nfts.length > 0 && (
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
	);
};

export default NftList;

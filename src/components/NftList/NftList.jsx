import React from "react";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";

const NftList = (props) => {
	// console.log("nftlist props", props.displayedNfts);
	return (
		<>
			{props.displayedNfts.length > 0 && (
				<ul className="cards">
					{props.displayedNfts.map((nft, i) => {
						console.log("nft", nft.token_address);
						return (
							<NftCard nft={nft} key={nft.token_address + i} />
						);
					})}
				</ul>
			)}
		</>
	);
};

export default NftList;

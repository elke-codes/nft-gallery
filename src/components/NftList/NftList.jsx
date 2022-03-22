import React from "react";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";

const NftList = (props) => {
	return (
		<>
			{props.displayedNfts.length > 0 && (
				<ul className="cards">
					{props.displayedNfts.map((nft, i) => {
						return (
							<NftCard
								nft={nft}
								key={nft.token_address + i}
								index={i}
							/>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default NftList;

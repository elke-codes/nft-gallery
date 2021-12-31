import React, { useState } from "react";
import NftCard from "../NftCard/NftCard";
import "./NftList.scss";
import { v4 as uuid } from "uuid";
import { useEffect } from "react/cjs/react.development";

const NftList = (props) => {
	// const [displayedNfts, setDisplayedNfts] = useState(props.displayedNfts);
	// useEffect(() => {
	// 	setDisplayedNfts(props.displayedNfts);
	// }, [props.displayedNfts]);

	return (
		<>
			{props.displayedNfts.length > 0 && (
				<ul className="cards">
					{props.displayedNfts.map((nft) => {
						console.log("mapping");
						return <NftCard nft={nft} key={uuid()} />;
					})}
				</ul>
			)}
		</>
	);
};

export default NftList;

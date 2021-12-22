import React, { useEffect, useState } from "react";
import NftCard from "../NftCard/NftCard";

import axios from "axios";

const NftList = (props) => {
	const { nftList, setNftList } = useState();

	useEffect = () => {
		console.log("effect runs");
		axios
			.get(
				`https://deep-index.moralis.io/api/v2/${props.searchQuery}nft?chain=eth`,
				{
					headers: {
						"x-api-key":
							"csUE0cmbWJageAjqXURl5CahhEgpObzsuCpE5bjBKRQl16ArCB556UmPPvv8qGj7"
					}
				}
			)
			.then((result) => {
				console.log(result);
				// nftList = result;
			})
			.catch((error) => console.log(error));
	};
	return (
		<ul>
			<li>searching for {props.searchQuery}</li>
			<div>{nftList}</div>
			<NftCard />
		</ul>
	);
};

export default NftList;

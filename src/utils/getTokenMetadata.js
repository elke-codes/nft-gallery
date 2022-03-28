// get the metadata directly from the blockchain, if we can t get it through moralis

// - instatiate a new contract with ethers at an address i have from moralis(token_address)
// -it has the methods i get from the abi
// const my contract = contract at this address with these methods
// abi = list of methods, in my case i only need tokenURI()
// make axios call to get the maetadata at the URI

//inspired by:
// https://0xtracker.com/news-and-updates/0x-tracker/fetching-ethereum-token-metadata-for-use-in-decentralised-apps

import axios from "axios";
import { ethers } from "ethers";
import { transformMetadataUri } from "./transformMetadataUri";

const WEB3_ENDPOINT = process.env.REACT_APP_INFURA_URL;

export const getTokenMetadata = async (address, tokenId) => {
	const abi = [
		"function tokenURI(uint256 tokenId) external view returns (string memory)"
	];
	const { JsonRpcProvider } = ethers.providers;
	const provider = new JsonRpcProvider(WEB3_ENDPOINT);
	const contract = new ethers.Contract(address, abi, provider);
	const URI = await contract.tokenURI(tokenId).catch((e) => {
		console.log("contract.tokenuri", e);
		return undefined;
	});
	console.log("URI", URI);

	const transformedUri = transformMetadataUri(URI);
	// console.log("transformedUri", transformedUri);
	const metadata = await axios.get(transformedUri, {
		timeout: 2 * 1000
	});
	console.log("metadata", metadata);
	return metadata;
};

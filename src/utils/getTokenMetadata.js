// - instatiate a new contract with ethers at an address i have from moralis(token_address)
// -it has the methods i get from the abi

// const my contract = contract at this address with these methods

// function tokenURI(uint256 \_tokenId) external view returns (string);

// const ERC721_ABI = []; // big array from internet

// const ERC721 = ethers.Contract(nft.token_address, ERC721_ABI);

// const uri = await ERC721.tokenUri(nft.token_id);
// const name = await ERC721.name();

// https://0xtracker.com/news-and-updates/0x-tracker/fetching-ethereum-token-metadata-for-use-in-decentralised-apps

import { ethers } from "ethers";
const INFURA_URL = process.env.REACT_APP_INFURA_URL;
const WEB3_ENDPOINT = INFURA_URL;

const handleError = () => {
	return undefined;
};

export const getTokenMetadata = async (address, tokenId) => {
	console.log("getTokenMetadata tokenid", tokenId);
	const abi = [
		"function name() view returns (string name)",
		"function symbol() view returns (string symbol)",
		"function decimals() view returns (uint8 decimals)",
		"function tokenURI(uint256 _tokenId) external view returns (string);"
	];
	console.log("abi", abi);
	const { JsonRpcProvider } = ethers.providers;
	console.log("Jsonrpcprovider", JsonRpcProvider);
	console.log("web3 endpoint", WEB3_ENDPOINT);
	const provider = new JsonRpcProvider(WEB3_ENDPOINT);
	console.log("provider", provider);
	console.log("address", address);
	const contract = new ethers.Contract(address, abi, provider);
	console.log(contract);
	const [name, symbol, decimals, tokenUri] = await Promise.all([
		contract.name().catch(handleError),
		contract.symbol().catch(handleError),
		contract.decimals().catch(handleError),
		contract.tokenURI(tokenId).catch((e) => {
			console.log("tokenuri error", e);
		})
	]);
	console.log("name", name);
	console.log("symbol", symbol);
	console.log("decimals", decimals);
	console.log("tokenUri", tokenUri);

	return { decimals, name, symbol, tokenUri };
};

// module.exports = { getTokenMetadata };

import axios from "axios";
import { transformMetadataUri } from "./transformMetadataUri";
import { transformTokenUri } from "./transformTokenUri";
import cantload from "../../src/assets/images/cantload.png";
import { getTokenMetadata } from "./getTokenMetadata";

const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;
const INFURA_URL = process.env.REACT_APP_INFURA_URL;

export const getNfts = async (address) => {
	console.log("getting nfts", address);

	try {
		const data = await axios.get(
			`https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`,
			{
				headers: {
					"X-API-KEY": API_KEY

					// 	,
					// "Access-Control-Allow-Origin": "*"
				}
			}
		);

		const nfts = await Promise.all(
			// reliably return an array from this function
			(data.data.result || []).map(async (nft) => {
				let metadata;
				// if the nft response from moralis contains valid metadata,
				// we can use that directly, they parsed it for us.
				if (nft.metadata) {
					metadata = JSON.parse(nft.metadata);
				} else {
					// otherwise ,we need to  use axios to call the token_uri property
					// on the nft. the response will then be the metadata.
					const tokenUri = transformTokenUri(nft.token_uri);
					try {
						const resp = await axios.get(tokenUri, {
							timeout: 2 * 1000
						});
						metadata = resp.data;
						// console.log("got metadata from tokenuri", metadata);
					} catch (e) {
						// console.log("couldnt get metadata", e);
						metadata = undefined;
					}
				}

				let imageSrc;
				if (metadata && metadata.image) {
					if (metadata.image.includes("ipfs")) {
						imageSrc = transformMetadataUri(
							metadata.image,
							nft.token_id
						);
					} else {
						imageSrc = metadata.image;
					}
				} else {
					try {
						//do erc721 stuff
						const tokenMetadata = await getTokenMetadata(
							nft.token_address,
							nft.token_id
						);
						console.log("tokenMetadata", tokenMetadata);
						// TODO get the metadata like with moralis
						// imageSrc = metadata.
					} catch (e) {
						imageSrc = cantload;
					}
				}

				const tokenId = nft.token_id;

				nft.metadata = metadata;
				nft.imageSrc = imageSrc;
				return { nft, tokenId };
			})
		);
		// console.log("length nfts get nfts", nfts.length);
		// console.log("nft count", data.data.total);

		return {
			nfts,
			totalCount: data.data.total,
			cursor: data.data.cursor
		};
	} catch (e) {
		console.log("axios error", e);
		const axiosErrorMessage =
			"Couldn't find address :'( . Please check address, try another one";
		return { axiosErrorMessage };
	}
};

import axios from "axios";
import { transformMetadataUri } from "./transformMetadataUri";
import { transformTokenUri } from "./transformTokenUri";
import cantload from "../../src/assets/images/cantload.png";
const IPFS_GATEWAY_PREFIX = "https://ipfs.io/";

export const getNextPageNfts = async (address, cursor) => {
	console.log("get next page nfts address cursor", address, cursor);

	try {
		const data = await axios.get(
			`https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal&cursor=${cursor}`,
			{
				headers: {
					"X-API-KEY":
						"csUE0cmbWJageAjqXURl5CahhEgpObzsuCpE5bjBKRQl16ArCB556UmPPvv8qGj7"
					// 	,
					// "Access-Control-Allow-Origin": "*"
				}
			}
		);

		console.log("Data getNextPageNfts", data);
		console.log("cursor getnextpagenfts", data.data.cursor);
		const nextNfts = await Promise.all(
			// reliably return an array from this function
			(data.data.result || []).map(async (nft) => {
				// console.log("in loop");
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
					// console.log("using placeholder for", nft);
					imageSrc = cantload;
				}

				nft.metadata = metadata;
				nft.imageSrc = imageSrc;
				return nft;
			})
		);
		console.log("length nfts getnextpagenfts", nextNfts.length);
		console.log("nft count", data.data.total);

		return {
			nextNfts,
			totalCount: data.data.total,
			newCursor: data.data.cursor
		};
	} catch (e) {
		console.log("axios error", e);
		return;
	}
};

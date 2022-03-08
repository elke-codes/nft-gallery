import axios from "axios";
import { transformMetadataUri } from "./transformMetadataUri";
import { transformTokenUri } from "./transformTokenUri";
const IPFS_GATEWAY_PREFIX = "https://ipfs.io/";

export const getNfts = async (address) => {
	try {
		const data = await axios.get(
			`https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`,
			{
				headers: {
					"X-API-KEY":
						"csUE0cmbWJageAjqXURl5CahhEgpObzsuCpE5bjBKRQl16ArCB556UmPPvv8qGj7"
				}
			}
		);
		// reliably return an array from this function
		const nfts = await Promise.all(
			(data.data.result || []).map(async (nft) => {
				// console.log("in loop", nft);
				let metadata;
				// if the nft response from moralis contains valid metadata,
				// we can ue that directly, they parsed it for us.
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
						console.log("got metadata from tokenuri", metadata);
					} catch (e) {
						console.log("couldnt get metadata", e);
						metadata = undefined;
					}
				}

				let imageSrc;
				if (metadata && metadata.image) {
					if (metadata.image.startsWith("ipfs://")) {
						imageSrc = transformMetadataUri(
							metadata.image,
							nft.token_id
						);
					} else {
						imageSrc = metadata.image;
					}
				} else {
					console.log("using placeholder for", nft);
					imageSrc = "https://plchldr.co/i/300x250";
				}

				nft.metadata = metadata;
				nft.imageSrc = imageSrc;
				return nft;
			})
		);

		return {
			nfts,
			totalCount: data.data.total
		};
	} catch (e) {
		console.log("axios error", e);
		return;
	}
};

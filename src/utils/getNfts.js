import axios from "axios";
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
		console.log("received response from axios", data);

		const nfts = data.data.result.map((nft) => {
			// console.log("in loop", nft);
			let metadata;
			if (nft.metadata) {
				metadata = JSON.parse(nft.metadata);
			}

			let imageSrc;
			if (metadata && metadata.image) {
				if (metadata.image.startsWith("ipfs://")) {
					imageSrc = IPFS_GATEWAY_PREFIX + metadata.image.slice(7);
				} else {
					imageSrc = metadata.image;
				}
			} else {
				imageSrc = "https://plchldr.co/i/300x250";
			}

			nft.metadata = metadata;
			nft.imageSrc = imageSrc;
			return nft;
		});

		return {
			nfts,
			totalCount: data.data.total_count
		};
	} catch (e) {
		console.log("axios error", e);
		return;
	}
};

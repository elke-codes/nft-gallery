export const IPFS_GATEWAY_PREFIX = "https://ipfs.io/";
export const transformMetadataUri = (metadataUri, id) => {
	if (!metadataUri.includes("ipfs")) {
		metadataUri = metadataUri.replace("0x{id}", id);
		metadataUri = metadataUri.replace("{id}", id);
		return metadataUri;
	}

	// metadataUri = metadataUri.replace("https://gateway.pinata.cloud/ipfs/", "");
	if (metadataUri.includes("pinata.cloud")) {
		const s = metadataUri.split(".cloud/");
		// console.log(s[1]);
		metadataUri = s[1];

		// metadataUri = IPFS_GATEWAY_PREFIX + id;
		// return metadataUri;
	}
	metadataUri = metadataUri.replace(".ipfs.dweb.link", "");
	metadataUri = metadataUri.replace("https:/cloudflare-ipfs.com/", "");
	metadataUri = metadataUri.replace("cloudflare-ipfs.com/", "");
	metadataUri = metadataUri.replace("https://ipfs.moralis.io/", "");
	metadataUri = metadataUri.replace("/metadata.json", "");
	metadataUri = metadataUri.replace("https://ipfs.io/ipfs/", "");
	metadataUri = metadataUri.replace("https://ipfs.io/", "");
	metadataUri = metadataUri.replace("https://", "");
	metadataUri = metadataUri.replace("ipfs/", "");
	metadataUri = metadataUri.replace("ipfs://", "");
	metadataUri = metadataUri.replace("0x{id}", id);
	metadataUri = metadataUri.replace("{id}", id);
	// metadataUri = metadataUri.replace("http", "https");
	metadataUri = IPFS_GATEWAY_PREFIX + "ipfs/" + metadataUri;

	return metadataUri;
};

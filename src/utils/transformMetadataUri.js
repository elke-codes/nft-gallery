export const IPFS_GATEWAY_PREFIX = "https://ipfs.io/";
export const transformMetadataUri = (metadataUri, id) => {
	if (!metadataUri.includes("ipfs")) {
		metadataUri = metadataUri.replace("0x{id}", id);
		metadataUri = metadataUri.replace("{id}", id);
		return metadataUri;
	}

	metadataUri = metadataUri.replace("https://gateway.pinata.cloud/ipfs/", "");
	metadataUri = metadataUri.replace("https://ipfs.moralis.io/", "");
	metadataUri = metadataUri.replace("/metadata.json", "");

	metadataUri = metadataUri.replace("https://ipfs.io/ipfs/", "");
	metadataUri = metadataUri.replace("https://ipfs.io/", "");
	metadataUri = metadataUri.replace("ipfs/", "");
	metadataUri = metadataUri.replace("ipfs://", "");
	metadataUri = metadataUri.replace("0x{id}", id);
	metadataUri = metadataUri.replace("{id}", id);
	metadataUri = IPFS_GATEWAY_PREFIX + "ipfs/" + metadataUri;

	return metadataUri;
};

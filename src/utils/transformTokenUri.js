import { getNfts } from "./getNfts";

export const transformTokenUri = (tokenUri) => {
	if (!tokenUri) return;
	if (!tokenUri.includes("api.opensea.io")) {
		return tokenUri;
	}
	tokenUri = tokenUri.replace("?format=api", "");
	return tokenUri + "?format=json";
};

import {
	transformMetadataUri,
	IPFS_GATEWAY_PREFIX
} from "./transformMetadataUri";

it("should not transform a http url without ids", () => {
	const url = "https://www.google.com";
	const transformed = transformMetadataUri(url);
	expect(transformed).toBe(url);
});

it("should transform a http url with 0x{id} in it", () => {
	const url = "https://www.google.com/0x{id}";
	const id = 22;
	const transformed = transformMetadataUri(url, id);
	expect(transformed).toBe("https://www.google.com/22");
});

it("should transform a http url with {id} in it", () => {
	const url = "https://www.google.com/{id}";
	const id = 22;
	const transformed = transformMetadataUri(url, id);
	expect(transformed).toBe("https://www.google.com/22");
});

it("should transform a http url that starts with https://ipfs.moralis.io/", () => {
	const url = "https://ipfs.moralis.io/12345";

	const transformed = transformMetadataUri(url);
	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + "12345";
	expect(transformed).toBe(expected);
});

it("should transform a http url that has https://ipfs.moralis.io/metadata.json", () => {
	const url = "https://ipfs.moralis.io/12345/metadata.json";

	const transformed = transformMetadataUri(url);
	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + "12345";
	expect(transformed).toBe(expected);
});

it("should transform a http url that has https://ipfs.io/ipfs/", () => {
	const url = "https://ipfs.io/ipfs/12345/metadata.json";

	const transformed = transformMetadataUri(url);
	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + "12345";
	expect(transformed).toBe(expected);
});

it("should transform a http url that has https://ipfs.io/", () => {
	const url = "https://ipfs.io/12345/metadata.json";

	const transformed = transformMetadataUri(url);
	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + "12345";
	expect(transformed).toBe(expected);
});

it("should transform a http url that has ipfs/", () => {
	const url = "https://ipfs.io/ipfs/12345/metadata.json";

	const transformed = transformMetadataUri(url);
	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + "12345";
	expect(transformed).toBe(expected);
});

it("should transform a ipfs url that has ipfs://", () => {
	const url = "ipfs://12345/metadata.json";

	const transformed = transformMetadataUri(url);
	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + "12345";
	expect(transformed).toBe(expected);
});

it("should transform a http url that has 0x{id}", () => {
	const url = "https://ipfs.io/ipfs/0x{id}";
	const id = 33;
	const transformed = transformMetadataUri(url, id);
	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + 33;
	expect(transformed).toBe(expected);
});

it("should transform a http url that has {id}", () => {
	const url = "https://ipfs.io/ipfs/{id}";
	const id = 33;
	const transformed = transformMetadataUri(url, id);
	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + 33;
	expect(transformed).toBe(expected);
});

it("should transform a http url that has https: https:/cloudflare-ipfs.com/", () => {
	const url = "https://ipfs.io/ipfs/https:/cloudflare-ipfs.com/12345";

	const transformed = transformMetadataUri(url);
	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + "12345";
	expect(transformed).toBe(expected);
});

// it("should transform a http url that starts with https://gateway.pinata.cloud/", () => {
// 	const url = "https://gateway.pinata.cloud/ipfs/12345";

// 	const transformed = transformMetadataUri(url);
// 	const expected = IPFS_GATEWAY_PREFIX + "ipfs/" + "12345";
// 	expect(transformed).toBe(expected);
// });

it("should transform a http url that starts has pinata.cloud", () => {
	const url =
		"https://ipfs.io/ipfs/https://hornyhogs.mypinata.cloud/QmTkHwTiQzkwCQfSz9ugMu3Qt56Sj2ZHi28CKLqzTRGn5B";

	const transformed = transformMetadataUri(url);
	const expected =
		IPFS_GATEWAY_PREFIX +
		"ipfs/" +
		"QmTkHwTiQzkwCQfSz9ugMu3Qt56Sj2ZHi28CKLqzTRGn5B";
	expect(transformed).toBe(expected);
});

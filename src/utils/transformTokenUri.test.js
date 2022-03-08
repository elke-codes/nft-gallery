import { transformTokenUri } from "./transformTokenUri";

it("should not transform url", () => {
	const url = "https://www.google.com";

	const transformed = transformTokenUri(url);
	const expected = "https://www.google.com";
	expect(transformed).toBe(expected);
});

it("should remove ?format=api", () => {
	const url =
		"https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x600a22c630d86889851680e12062b7ba4fff81ab000000000000620000000001?format=api";

	const transformed = transformTokenUri(url);
	const expected =
		"https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x600a22c630d86889851680e12062b7ba4fff81ab000000000000620000000001?format=json";
	expect(transformed).toBe(expected);
});

it("should return uri + ?format=json", () => {
	const url =
		"https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x600a22c630d86889851680e12062b7ba4fff81ab000000000000620000000001";

	const transformed = transformTokenUri(url);
	const expected =
		"https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x600a22c630d86889851680e12062b7ba4fff81ab000000000000620000000001?format=json";
	expect(transformed).toBe(expected);
});

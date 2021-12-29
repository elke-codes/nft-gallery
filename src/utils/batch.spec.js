import { batch } from "./batch";

it("batches appropriately", () => {
	const arr = [];
	for (let i = 0; i < 100; i++) {
		arr.push(i);
	}
	// now we have a test array with 100 things in it.
	const batchSize = 20;

	let currentIndex = 0;

	const firstBatch = batch({
		batchSize,
		array: arr,
		currentIndex
	});

	expect(firstBatch).toStrictEqual(arr.slice(0, 20));
	currentIndex = 20;

	const secondBatch = batch({
		batchSize,
		array: arr,
		currentIndex
	});
});

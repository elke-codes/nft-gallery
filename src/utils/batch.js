// batch takes an array, a total number, and a batch size and returns us the next batch in the array.

import { useState } from "react";
import { getNfts } from "./getNfts";

// @param batchOpts: {batchSize: number, array: [], currentIndex: number}
export const batch = (batchOpts) => {
	// using batchOpts.array, batchOpts.currentIndex, and batchOpts.batchSize, you need to
	// return only the section of the array indicated by those parameters.

	// EDGE CASE TO WARN ABOUT:
	// batchOpts.array is 37 things. batchSize is 20.
	// you need to check if the batchSize you want is GREATER THAN the amount of things
	// remaining in the array for you to get, from teh currentINdex.
	// otherwise you will be returning undefined stuff.

	// if i pass in an array of 3 elements, and i say i want 20, i can just do
	// const nfts = getNfts(address);

	const batchOpts = {
		array,
		currentIndex,
		batchSize: 20
	};

	// const [array, setArray] = useState([nfts]);
	// const [currentIndex, setCurrentIndex] = useState(0);

	if (array.length >= 20) {
		array.splice(currentIndex, batchSize);
		setCurrentIndex(currentIndex + batchSize);
	} else {
		return batchOpts.array;
	}
};

const nfts = getFromMoralis();
// nfts is an array of 500 things.
// we need the first 20 to display on the page.
// when infinite scroll hits, we need the next 20.
// etcetera.
let batchInTwenty = batch({
	currentIndex: 0,
	array: nfts,
	batchSize: 20
});

// we haev the first 20 nfts.
// user has now scrolle to the bottom. get next 20
let batchInTwenty = batch({
	currentIndex: currentIndex + batchSize, // now this is 20 on first iteration
	array: nfts,
	batchSize: 20
});

// user has scrolled to the botto magain

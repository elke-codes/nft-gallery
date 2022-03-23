import { ethers, providers } from "ethers";
import React from "react";
import "./SearchBar.scss";
const INFURA_URL = `https://mainnet.infura.io/v3/b9cc108d012c4c0a859bdf1ef437a9c2`;

const SearchBar = (props) => {
	console.log("infura url", INFURA_URL);
	const handleSubmit = async (e) => {
		e.preventDefault();

		// if e.target.searchInput.value includes .eth do resolve ens name into eth address
		if (e.target.searchInput.value.includes(".eth")) {
			try {
				const provider = new ethers.providers.JsonRpcProvider(
					INFURA_URL
				);
				const addressFromEns = await provider.resolveName(
					e.target.searchInput.value
				);
				console.log("searchbar ens", addressFromEns);
				props.onSearch(addressFromEns);
			} catch (e) {
				console.log("infura", e);
				// TODO error message to user
				// seterrormessage("couldn t find that address, please try again")
			}
		} else {
			props.onSearch(e.target.searchInput.value);
		}

		e.target.reset();
	};

	return (
		<>
			{!props.address && <h2>Find all NFTs on an ETHEREUM address</h2>}
			<form className="search-form" onSubmit={handleSubmit}>
				<label htmlFor="searchInput">
					Paste the ethereum address you want to check here:
				</label>
				<input
					type="text"
					placeholder="Search by address"
					className="search-form__searchbar"
					name="searchInput"
				/>
				<button type="submit" className="search-form__search-button">
					Search!
				</button>
			</form>
		</>
	);
};

export default SearchBar;

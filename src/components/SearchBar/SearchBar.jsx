import { ethers, providers } from "ethers";
import React, { useState } from "react";
import { Triangle } from "react-loader-spinner";
import "./SearchBar.scss";
const INFURA_URL = process.env.REACT_APP_INFURA_URL;

const SearchBar = ({ onSearch, address, resolvingEns, setResolvingEns }) => {
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// loadingNftsState(true);
		// if e.target.searchInput.value includes .eth do resolve ens name into eth address
		if (e.target.searchInput.value.includes(".eth")) {
			setResolvingEns(true);

			try {
				const provider = new ethers.providers.JsonRpcProvider(
					INFURA_URL
				);
				const addressFromEns = await provider.resolveName(
					e.target.searchInput.value
				);
				console.log("searchbar ens", addressFromEns);
				onSearch(addressFromEns);
			} catch (e) {
				// console.log("infura", e);
				// TODO error message to user
				setErrorMessage(
					"Couldn't resolve address :'( . Please check the address or try another one."
				);
			}
			setResolvingEns(false);
		} else {
			onSearch(e.target.searchInput.value);
		}

		e.target.reset();
	};

	const handleMetaMask = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const metaMaskAddress = await provider.send("eth_requestAccounts", []);
		onSearch(metaMaskAddress);
	};

	return (
		<>
			{!address && <h2>Find all NFTs on an ETHEREUM address</h2>}
			<div className="search-wrapper">
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
					<button
						type="submit"
						className="search-form__search-button">
						Search!
					</button>
				</form>

				{!address && (
					<>
						<p>or</p>
						<button
							className="search-form__metamask-button"
							onClick={handleMetaMask}>
							Connect with MetaMask
						</button>
					</>
				)}
				{resolvingEns && (
					<Triangle>
						<p>Resolving address... </p>
					</Triangle>
				)}
				{errorMessage && <p>{errorMessage}</p>}
			</div>
		</>
	);
};

export default SearchBar;

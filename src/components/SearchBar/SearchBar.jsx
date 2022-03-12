import React from "react";
import "./SearchBar.scss";

const SearchBar = (props) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		props.onSearch(e.target.searchInput.value);
		// console.log(e.target.searchInput.value);
		e.target.reset();
	};

	return (
		<>
			<h2>Find all NFTs on an ETHEREUM address</h2>
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

import { BrowserRouter, Switch } from "react-router-dom";
import NftList from "../components/NftList/NftList";
import SearchBar from "../components/SearchBar/SearchBar";
import axios from "axios";
import React, { Component } from "react";

class GalleryPage extends Component {
	state = {
		searchQuery: ""
	};

	handleSearch = (userInput) => {
		this.setState({
			searchQuery: userInput
		});

		this.getNFTs();
	};

	getNFTs = () => {
		axios
			.get(
				`https://deep-index.moralis.io/api/v2/${this.state.searchQuery}nft?chain=eth&format=decimal`,
				{
					headers: {
						"X-API-KEY":
							"csUE0cmbWJageAjqXURl5CahhEgpObzsuCpE5bjBKRQl16ArCB556UmPPvv8qGj7"
					}
				}
			)
			.then((result) => {
				console.log(result);
				// nftList = result;
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<main>
				<div className="search-container">
					<SearchBar onSearch={this.handleSearch} />
					{this.state.searchQuery && (
						<h2>
							Searching nft s on address: {this.state.searchQuery}
						</h2>
					)}
				</div>
				<NftList searchQuery={this.state.searchQuery} />
			</main>
		);
	}
}

export default GalleryPage;

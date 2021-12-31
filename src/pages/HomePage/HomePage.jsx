/// HOMEPAGE.JSX ///

import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<main>
			<section className="homepage">
				<h2>Welcome to my NFT Gallery!</h2>
				<p className="homepage__copy">
					The idea is simple: enter an ETHEREUM address and see which
					NFT's that wallet holds. I've added the option to check out
					some celebrity portfolios too. As I grow and learn, I will
					add more blockchains to browse through, like Solana for
					example.{" "}
					<a
						href="mailto:elke.codes@gmail.com"
						title="Send me an email!"
						className="homepage__copy-email">
						Let me know what you think!
					</a>{" "}
					And happy browsing throught the wonderworld of digital art
					collections!
				</p>
				<button className="homepage__button">
					<Link to="/gallery" className="homepage__button-link">
						Check out the NFT Gallery
					</Link>
				</button>
			</section>
		</main>
	);
};

export default HomePage;

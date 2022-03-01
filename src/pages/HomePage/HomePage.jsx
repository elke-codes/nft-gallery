import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<main>
			<section className="homepage">
				<h2 className="homepage__title">Welcome to my NFT Gallery!</h2>
				<p className="homepage__copy">
					The idea is simple: enter an ETHEREUM address and see which
					NFT's that wallet holds.
				</p>
				<p className="homepage__copy">
					I've added the option to check out some celebrity portfolios
					too.
				</p>
				<p className="homepage__copy">
					As I grow and learn, I will add more blockchains to browse
					through, like Solana for example.
				</p>
				<p className="homepage__copy">
					<a
						href="mailto:elke.codes@gmail.com"
						title="Send me an email!"
						className="homepage__copy-email">
						{" "}
						Let me know what you think!
					</a>{" "}
					And happy browsing throught the wonderworld of digital art
					collections!
				</p>
				<button className="homepage__button">
					<Link to="/gallery">Check out the NFT Gallery</Link>
				</button>
			</section>
		</main>
	);
};

export default HomePage;

import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<main>
			<section className="homepage">
				<h2>Welcome to my NFT Gallery!</h2>
				<p>
					The idea is simple: enter an ETHEREUM address and see which
					NFT's that wallet holds.
				</p>
				<p>
					I've added the option to check out some celebrity portfolios
					too.
				</p>
				<p>
					As I grow and learn, I will add options for more
					blockchains, like Solana for example.
				</p>
				<p>
					Let me know what you think! And happy browsing throught the
					wonderworld of digital art collections!
				</p>
				<button className="homepage__button">
					<Link to="/gallery">Go to NFT Gallery</Link>
				</button>
			</section>
		</main>
	);
};

export default HomePage;

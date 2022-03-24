import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<main className="homepage__wrapper">
			<section className="homepage">
				<h2 className="homepage__title">Welcome to my NFT Gallery!</h2>
				<p className="homepage__copy">
					The idea is simple: enter an ETHEREUM address and see which
					NFTs that wallet holds.
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
				<div className="homepage__button-wrapper">
					<button className="homepage__button">
						<Link to="/celebrities">Celebrity Wallets</Link>
					</button>
					<button className="homepage__button">
						<Link to="/gallery">Enter address</Link>
					</button>
				</div>
			</section>
			{/* <p className="homepage__thanks">
				with big thanks to Jeff, who helped me navigate new terrain
			</p> */}
		</main>
	);
};

export default HomePage;

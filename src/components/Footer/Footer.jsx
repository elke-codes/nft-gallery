import React from "react";
import "./Footer.scss";
import GitHubLogo from "../../assets/icons/GitHub-Mark/PNG/GitHub-Mark-Light-32px.png";

const Footer = () => {
	return (
		<footer className="footer">
			{/* <p className="footer__name">A project by Elke Dick</p> */}
			<ul className="footer__list">
				<li className="footer__list-item">
					<a
						href="https://github.com/elke-codes/nft-gallery"
						target="_blank"
						title="Check it out on GitHub"
						className="footer__link">
						<img src={GitHubLogo} alt="GitHub Logo" />
					</a>
				</li>
				{/* <li className="footer__list-item">
					<a
						href="mailto:elke.codes@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						title="Get in touch!"
						className="footer__link-email">
						📨
					</a>
				</li> */}
			</ul>
		</footer>
	);
};

export default Footer;

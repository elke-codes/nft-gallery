import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Header.scss";

const Header = () => {
	return (
		<header className="header">
			<Logo />

			<nav className="header__nav">
				<Link to="/" className="header__nav-link">
					Home
				</Link>
				<Link to="/gallery" className="header__nav-link">
					ETH Gallery
				</Link>
				<Link to="/" className="header__nav-link">
					Login
				</Link>
			</nav>
		</header>
	);
};

export default Header;

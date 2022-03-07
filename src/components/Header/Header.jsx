import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import Logo from "../Logo/Logo";
import "./Header.scss";

const Header = () => {
	const [hamburgerOpen, setHamburgerOpen] = useState(false);

	return (
		<header className="header">
			<Logo />

			<nav className="header__nav">
				{/* <Hamburger setHamburgerOpen={setHamburgerOpen} />
				{hamburgerOpen && (
					<>
						<NavLink
							to="/gallery"
							className="header__burger-nav-link"
							activeClassName="burger-header__nav-link--active">
							ETH Gallery
						</NavLink>
						<NavLink
							to="/login"
							className="header__burger-nav-link"
							activeClassName="header__-burger-nav-link--active">
							Login
						</NavLink>
					</>
				)} */}
				{/* <NavLink
					to="/"
					className="header__nav-link"
					activeClassName="header__nav-link--active">
					Home
				</NavLink> */}
				<NavLink
					to="/gallery"
					className="header__nav-link"
					activeClassName="header__nav-link--active">
					ETH Gallery
				</NavLink>
				<NavLink
					to="/celebrities"
					className="header__nav-link"
					activeClassName="header__nav-link--active">
					Celebrities
				</NavLink>
				<NavLink
					to="/login"
					className="header__nav-link"
					activeClassName="header__nav-link--active">
					Login
				</NavLink>
			</nav>
		</header>
	);
};

export default Header;

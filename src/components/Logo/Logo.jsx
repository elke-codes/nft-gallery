/// LOGO.JSX ///

import React from "react";
import "./Logo.scss";
import logo from "../../assets/images/panda.png";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<Link to="/">
			<div className="logo">
				<img src={logo} alt="" className="logo__image" />
				<h1 className="logo__title">NFT Gallery</h1>
			</div>
		</Link>
	);
};

export default Logo;

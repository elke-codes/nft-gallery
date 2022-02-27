import React from "react";
import "./Hamburger.scss";

const Hamburger = (setHamburgerOpen) => {
	return (
		<svg
			onClick={() => setHamburgerOpen(true)}
			className="hamburger"
			viewBox="0 0 100 80"
			width="40"
			height="40">
			<rect width="100" height="10" rx="8"></rect>
			<rect y="30" width="100" height="10" rx="8"></rect>
			<rect y="60" width="100" height="10" rx="8"></rect>
		</svg>
	);
};

export default Hamburger;

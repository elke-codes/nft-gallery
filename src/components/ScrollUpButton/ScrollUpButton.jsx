/// SCROLLUPBUTTON.JSX ///

import React from "react";
import "./ScrollUpButton.scss";

const ScrollUpButton = () => {
	const handleClick = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
	};
	return (
		<button className="scroll-up-button" onClick={handleClick}>
			<a href="#header" className="scroll-up-button__text">
				&#8963;
			</a>
		</button>
	);
};

export default ScrollUpButton;

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
			<p className="scroll-up-button__text">&#8963;</p>
		</button>
	);
};

export default ScrollUpButton;

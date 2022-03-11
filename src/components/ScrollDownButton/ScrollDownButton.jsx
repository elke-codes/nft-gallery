import React from "react";
import "./ScrollDownButton.scss";

const ScrollDownButton = () => {
	const handleClick = () => {
		window.scroll({
			top: document.documentElement.scrollHeight,
			left: 0,
			behavior: "smooth"
		});
	};
	return (
		<button className="scroll-down-button" onClick={handleClick}>
			<p className="scroll-down-button__text">&#8964;</p>
		</button>
	);
};

export default ScrollDownButton;

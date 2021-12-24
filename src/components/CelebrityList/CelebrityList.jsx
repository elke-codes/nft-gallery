import React from "react";
import { Link } from "react-router-dom";
import celebrityData from "../../data/celebrities.json";

const CelebrityList = () => {
	return (
		<article>
			<h2 className="gallery__celebrities-title">
				Check out these celebrities' NFT collection
			</h2>
			{celebrityData.map((celebrity) => {
				<p>{celebrity.name}</p>;
				// <Link
				// // to={`/eth/${celebrity.address}`}
				// // // key={video.id}
				// // onClick={
				// // 	// https://www.codegrepper.com/code-examples/javascript/onclick+scroll+to+top+javascript
				// // 	window.scroll({
				// // 		top: 0,
				// // 		left: 0,
				// // 		behavior: "smooth"
				// // 	})
				// // }
				// >
				// 	<div>
				// 		{/* <img src="https://plchldr.co/i" /> */}

				// 		<p>{celebrity.name}</p>
				// 	</div>
				// </Link>;
			})}
		</article>
	);
};

export default CelebrityList;

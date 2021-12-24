import React from "react";
import { Link } from "react-router-dom";
import celebrityData from "../../data/celebrities.json";
import "./CelebrityList.scss";

const CelebrityList = (props) => {
	const handleClick = (address, celebrity) => {
		props.onSearch(address, celebrity);
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
	};
	console.log("from celebritylist", celebrityData);

	return (
		<article className="celebrity">
			<h2 className="celebrity__title">
				Check out these celebrities' NFT collection
			</h2>
			{celebrityData.map((celebrity) => {
				return (
					<Link
						to={`/eth/${celebrity.address}`}
						// key={video.id}
						className="celebrity__link"
						onClick={() => {
							handleClick(celebrity.address, celebrity.name);
						}}>
						<div className="celebrity__info">
							<img
								className="celebrity__image"
								src="https://plchldr.co/i/20x20"
							/>

							<p className="celebrity__name">{celebrity.name}</p>
						</div>
					</Link>
				);
			})}
		</article>
	);
};

export default CelebrityList;

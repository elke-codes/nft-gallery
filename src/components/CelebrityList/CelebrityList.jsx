/// CELEBRITYLIST.JSX ///

import React from "react";
import { Link } from "react-router-dom";
import celebrityData from "../../data/celebrities.json";
import "./CelebrityList.scss";
import { v4 as uuid } from "uuid";

const CelebrityList = (props) => {
	const handleClick = (address, celebrity) => {
		props.onSearch(address, celebrity);
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
	};

	return (
		<article className="celebrity">
			<h2 className="celebrity__title">
				Check out these celebrities' NFT collections
			</h2>
			{celebrityData.map((celebrity) => {
				return (
					<Link
						to={`/gallery/eth/${celebrity.address}`}
						key={uuid()}
						className="celebrity__link"
						onClick={() => {
							handleClick(celebrity.address, celebrity.name);
						}}>
						<div className="celebrity__info">
							<p className="celebrity__name">{celebrity.name}</p>
						</div>
					</Link>
				);
			})}
		</article>
	);
};

export default CelebrityList;

import React from "react";
import { useHistory } from "react-router-dom";
import celebrityData from "../../data/celebrities.json";
import "./CelebrityList.scss";
import { v4 as uuid } from "uuid";

const CelebrityList = (props) => {
	const history = useHistory();
	const handleClick = (address, celebrity) => {
		props.onSearch(address, celebrity);
		history.push(`/celebrities/eth/${address}`);
		// window.scroll({
		// 	top: 0,
		// 	left: 0,
		// 	behavior: "smooth"
		// });
	};

	return (
		// <article className="celebrity">
		// 	<h2 className="celebrity__title">
		// 		Check out these celebrities' NFT collections
		// 	</h2>
		// 	{celebrityData.map((celebrity) => {
		// 		return (
		// 			<Link
		// 				to={`/celebrities/eth/${celebrity.address}`}
		// 				key={uuid()}
		// 				className="celebrity__link"
		// 				onClick={() => {
		// 					handleClick(celebrity.address, celebrity.name);
		// 				}}>
		// 				<div className="celebrity__info">
		// 					<p className="celebrity__name">{celebrity.name}</p>
		// 				</div>
		// 			</Link>
		// 		);
		// 	})}
		// </article>
		<article>
			<form action="submit" onSubmit={handleClick}>
				<select name="" id="">
					{celebrityData.map((celebrity) => {
						return (
							<option value={celebrity.name}>
								{celebrity.name}
							</option>
						);
					})}
				</select>
				<input type="submit" value="Submit" />
			</form>
		</article>
	);
};

export default CelebrityList;

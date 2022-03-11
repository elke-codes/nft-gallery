/// --- LOGINPAGE.JSX --- ///

import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
	return (
		<main className="login">
			<h2 className="login__title">
				Personalized options coming soon...
			</h2>
			<button className="login__button">
				<Link to="/">back home</Link>
			</button>
		</main>
	);
};

export default LoginPage;

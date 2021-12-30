import { BrowserRouter, Switch, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import "./App.scss";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";

function App() {
	return (
		<BrowserRouter>
			<div className="content-container">
				<Header />
				<Switch>
					<Route
						path="/gallery/eth/:address"
						component={GalleryPage}
					/>
					<Route path="/gallery" component={GalleryPage} />
					<Route path="/" exact component={HomePage}></Route>
				</Switch>
			</div>
			<Footer />
		</BrowserRouter>
	);
}

export default App;

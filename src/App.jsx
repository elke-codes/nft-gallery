import { BrowserRouter, Switch, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import "./App.scss";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import CelebrityPage from "./pages/CelebrityPage/CelebrityPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ReactGA from "react-ga";
import "dotenv/config";
const TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID;
ReactGA.initialize(TRACKING_ID);

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
					<Route path="/celebrities" component={CelebrityPage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/" exact component={HomePage}></Route>
				</Switch>
			</div>
			<Footer />
		</BrowserRouter>
	);
}

export default App;

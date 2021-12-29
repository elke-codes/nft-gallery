import { BrowserRouter, Switch, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import "./App.scss";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route
						path="/gallery/eth/:address"
						component={GalleryPage}
					/>
					<Route path="/gallery" component={GalleryPage} />
					<Route path="/" exact component={HomePage}></Route>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;

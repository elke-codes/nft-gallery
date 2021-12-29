import { BrowserRouter, Switch, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import "./App.scss";
import Header from "./components/Header/Header";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route path="/eth/:address" component={GalleryPage} />
					<Route path="/" exact component={GalleryPage} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;

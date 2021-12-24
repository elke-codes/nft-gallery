import { BrowserRouter, Switch, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/eth/:address" component={GalleryPage} />
				<Route path="/" exact component={GalleryPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;

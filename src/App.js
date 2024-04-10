import "./App.css";
import { Search } from "./components/Search";
import cities from "./data/cities.json";

function App() {
	const data = cities.cities;
	return <div className="App">{<Search data={data} />}</div>;
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router";
import MainPage from "./pages/MainPage";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/product/Product";
import Pricing from "./pages/pricing/Pricing";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import AppLayout from "./layouts/AppLayout";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import CityList from "./components/city_list/CityList";
import CountryList from "./components/country_list/CountryList";
import City from "./components/city/City";
import Form from "./components/form/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/protectedRoute/ProtectedRoute";
import SignUp from "./pages/signup/SignUp";

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<Homepage />} />
						<Route path="/product" element={<Product />} />
						<Route path="/pricing" element={<Pricing />} />
						<Route
							path="/app"
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate to={"cities"} replace />} />
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;

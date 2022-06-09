import { useEffect } from "react";
import { Routes, Route, useNavigate, HashRouter, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// pages
import Layout from "./pages/Layout/index";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import SearchProduct from "./pages/SearchProduct/index";
import Admin from "./pages/Admin/index";
import PrivacyPolicy from "./pages/PrivacyPolicy/index";
import Account from "./pages/Account/index";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import NoMatch from "./pages/NoMatch";
import Product from "./pages/Product/index";

import { ErrorBoundary } from "./components/ErrorBoundary";

// redux
import { getCategoriesList } from "./features/Categories";
import { getHolidayKey } from "./features/UpcomimgHoliday";
import { changeAuthState } from "./features/Auth";

function App() {
	// state from redux
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const isAdmin = useSelector((state) => state.auth.isAdmin);

	const dispatch = useDispatch();

	// get data and subscribe auth changes with redux
	useEffect(() => {
		dispatch(getCategoriesList());
		dispatch(getHolidayKey());
		dispatch(changeAuthState());
	}, []);

	// MUI theme
	const theme = createTheme({
		palette: {
			primary: {
				main: "#c33a3a",
			},
			background: {
				default: "#f5f5f5",
				paper: "#fff",
			},
		},
	});
	const themeWithResponsiveFonts = responsiveFontSizes(theme);

	// TODO: privacy policy page

	return (
		<ErrorBoundary>
			<ThemeProvider theme={themeWithResponsiveFonts}>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="szukaj">
							<Route index element={<SearchProduct />} />
							<Route path={`:categorySlug`} element={<SearchProduct />} />
							<Route path={`/szukaj/:categorySlug/:productId`} element={<Product />} />
						</Route>
						<Route path="logowanie" element={<Login />} />
						<Route path="polityka-prywatnosci" element={<PrivacyPolicy />} />
						<Route path="*" element={<NoMatch />} />
						{isLoggedIn ? (
							<Route path="konto">
								<Route index element={<Account />} />
								<Route path="koszyk" element={<Cart />} />
								<Route path="zamowienie" element={<Order />} />
							</Route>
						) : (
							<Route path="konto/*" element={<Navigate replace to={"/logowanie"} />} />
						)}
						{isLoggedIn && isAdmin && <Route path="admin" element={<Admin />} />}
					</Route>
				</Routes>
			</ThemeProvider>
		</ErrorBoundary>
	);
}

export default App;

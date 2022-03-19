import { useEffect } from "react";
import { Routes, Route, useNavigate, HashRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// pages
import Layout from "./pages/Layout/index";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import SearchProduct from "./pages/SearchProduct/index";
import NewProducts from "./pages/NewProducts/index";
import Admin from "./pages/Admin/index";
import PrivacyPolicy from "./pages/PrivacyPolicy/index";
import Account from "./pages/Account/index";
import Cart from "./pages/Cart";
import NoMatch from "./pages/NoMatch";
import Product from "./pages/Product/index";

// redux
import { getCategoriesList } from "./features/Categories";
import { getHolidayKey } from "./features/UpcomimgHoliday";
import { changeAuthState } from "./features/Auth";

function App() {
	// state from redux
	const categoriesArr = useSelector((state) => state.categories.value);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const isAdmin = useSelector((state) => state.auth.isAdmin);

	const dispatch = useDispatch();

	// get data and subscribe auth changes with redux
	useEffect(() => {
		dispatch(getCategoriesList());
		dispatch(getHolidayKey());
		dispatch(changeAuthState());
	}, []);

	// redirect to admin page after sign in as admin
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	isAdmin && isLoggedIn && navigate("/admin");
	// }, [isLoggedIn, isAdmin]);

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

	return (
		<>
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
						{isLoggedIn && (
							<Route path="konto">
								<Route index element={<Account />} />
								<Route path="konto" element={<Cart />} />
							</Route>
						)}
						{isLoggedIn && isAdmin && <Route path="admin" element={<Admin />} />}
					</Route>
				</Routes>
			</ThemeProvider>
		</>
	);
}

export default App;

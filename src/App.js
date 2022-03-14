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
import slugifyString from "./utils/slugifyString";

// CONSTANTS
// import { ADMIN_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from "./CONSTANTS/ROUTES";

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
	let theme = createTheme({
		// breakpoints: {
		// 	values: {
		// 		// new breakpoints will be named: previous default breakpoint + number of pixels of new breakpoint
		// 		// this convention prevents changes in previously set breakpoints
		// 		xs: 0,
		// 		sm: 600,
		// 		md: 900,
		// 		lg: 1200,
		// 		xl: 1536,
		// 	},
		// },
		palette: {
			primary: {
				main: "#c33a3a",
			},
			background: {
				default: "#f5f5f5",
				paper: "#fff",
			},
		},
		// disable rounded corners for boxes
		// components: {
		// 	MuiPaper: {
		// 		styleOverrides: {
		// 			root: {
		// 				borderRadius: 12,
		// 				border: "1px solid red",
		// 				boxShadow: "none",
		// 			},
		// 		},
		// 	},
		// },
	});
	theme = responsiveFontSizes(theme);

	return (
		<>
			<ThemeProvider theme={theme}>
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

import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// components
import Product from "./pages/Product/index";
import SearchProductPage from "./pages/SearchProduct";

// redux
import { getCategoriesList } from "./features/Categories";
import { getHolidayKey } from "./features/UpcomimgHoliday";
import { changeAuthState } from "./features/Auth";

// CONSTANTS
import { ADMIN_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from "./CONSTANTS/ROUTES";

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

	// categories and products routes
	const categoriesRoutesArr = categoriesArr.map((cat) => ({
		path: cat.path,
		children: [
			{ index: true, element: <SearchProductPage categoryObj={cat} /> },
			{ path: `${cat.path}/:productId`, element: <Product /> },
		],
	}));

	const routes = [
		{
			...PUBLIC_ROUTES[0],
			children: [
				...PUBLIC_ROUTES[0].children,
				...categoriesRoutesArr,
				...(isLoggedIn ? PRIVATE_ROUTES : []), // if user is signed in add private routes
				...(isAdmin ? ADMIN_ROUTES : []), // if admin is signed in add admin route
			],
		},
	];

	const currentComponent = useRoutes(routes);

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
				{currentComponent}
			</ThemeProvider>
		</>
	);
}

export default App;

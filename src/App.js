import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// components
import ProductList from "./pages/ProductList/index";
import Product from "./pages/Product/index";

// CONSTANTS
import ROUTES from "./CONSTANTS/ROUTES";

function App() {
	const categoriesArr = useSelector((state) => state.categories.value);

	const categoriesRoutesArr = categoriesArr.map((cat) => ({
		path: cat.path,
		children: [
			{ index: true, element: <ProductList category={cat.key} /> },
			{ path: `${cat.path}/:productId`, element: <Product /> },
		],
	}));

	const allRoutes = [{ ...ROUTES[0], children: [...ROUTES[0].children, ...categoriesRoutesArr] }];

	const currentComponent = useRoutes(allRoutes);

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

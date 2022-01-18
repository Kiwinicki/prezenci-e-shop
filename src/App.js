import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// components
import Category from './pages/Category/index';
import Product from './pages/Product/index';

// CONSTANTS
import ROUTES from './CONSTANTS/ROUTES';

function App() {
	const categoriesArr = useSelector((state) => state.categories.value);

	const categoriesRoutesArr = categoriesArr.map((cat) => ({
		path: cat.path,
		children: [
			{ index: true, element: <Category category={cat.key} /> },
			{ path: `/${cat.path}/:productId`, element: <Product /> },
		],
	}));

	const allRoutes = [{ ...ROUTES[0], children: [...ROUTES[0].children, ...categoriesRoutesArr] }];

	const currentComponent = useRoutes(allRoutes);

	let theme = createTheme({
		palette: {
			primary: {
				main: '#c33a3a',
			},
			background: {
				default: '#f5f5f5',
				paper: '#fff',
			},
		},
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

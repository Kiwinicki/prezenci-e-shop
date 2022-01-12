import { useRoutes } from 'react-router-dom';
import ROUTES from './CONSTANTS/ROUTES';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';

function App() {
	const element = useRoutes(ROUTES);

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
				{element}
			</ThemeProvider>
		</>
	);
}

export default App;

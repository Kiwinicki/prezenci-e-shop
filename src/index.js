import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import { Provider as StoreProvider } from 'react-redux';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

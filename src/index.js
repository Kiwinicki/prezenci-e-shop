import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import store from "./store";
import { Provider as StoreProvider } from "react-redux";
import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider store={store}>
			<HashRouter>
				<App />
			</HashRouter>
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

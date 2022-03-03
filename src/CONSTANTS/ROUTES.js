// components (pages)
import Layout from "../pages/Layout/index";
import Home from "../pages/Home/index";
import Login from "../pages/Login/index";
import CategoriesList from "../pages/CategoriesList/index";
import NewProducts from "../pages/NewProducts/index";
import Admin from "../pages/Admin/index";
import PrivacyPolicy from "../pages/PrivacyPolicy/index";
import Account from "../pages/Account/index";
import NoMatch from "../pages/NoMatch";

// routes array (without categories routes) needed for creating routes witch useRoutes() hook
export const PUBLIC_ROUTES = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "/kategorie", element: <CategoriesList /> },
			{ path: "/nowosci", element: <NewProducts /> },
			{ path: "/logowanie", element: <Login /> },
			// here will be generated categories paths
			{ path: "/polityka-prywatnosci", element: <PrivacyPolicy /> },
			{ path: "*", element: <NoMatch /> },
		],
	},
];

export const PRIVATE_ROUTES = [{ path: "/konto", element: <Account /> }];

export const ADMIN_ROUTES = [{ path: "/admin", element: <Admin /> }];

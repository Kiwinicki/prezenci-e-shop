// components (pages)
import Layout from "../pages/Layout/index";
import Home from "../pages/Home/index";
import Login from "../pages/Login/index";
import CategoriesList from "../pages/CategoriesList/index";
import NewProducts from "../pages/NewProducts/index";
import Admin from "../pages/Admin/index";
import PrivacyPolicy from "../pages/PrivacyPolicy/index";
import NoMatch from "../pages/NoMatch";

// routes array (without categories pathes) needed for creating routes witch useRoutes() hook
const ROUTES = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "/kategorie", element: <CategoriesList /> },
			{ path: "/nowosci", element: <NewProducts /> },
			// here will be generated categories paths
			{ path: "/login", element: <Login /> },
			{ path: "/polityka-prywatnosci", element: <PrivacyPolicy /> },
			{ path: "/admin", element: <Admin /> },
			{ path: "*", element: <NoMatch /> },
		],
	},
];

export default ROUTES;

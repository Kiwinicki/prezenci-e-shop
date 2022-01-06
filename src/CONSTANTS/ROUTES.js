import CATEGORIES from './CATEGORIES';

import Layout from '../pages/Layout/index';
import Home from '../pages/Home/index';
import Login from '../pages/Login/index';
import CategoriesList from '../pages/CategoriesList/index';
import Category from '../pages/Category/index';
import Product from '../pages/Product/index';
import Admin from '../pages/Admin/index';
import NoMatch from '../pages/NoMatch';

// creates category route with index page - product list and products in this category
const categoriesRoutesArr = Object.entries(CATEGORIES).map((cat) => ({
	path: cat.path,
	children: [
		{ index: true, element: <Category category={cat.key} /> },
		{ path: `/${cat.path}/:productId`, element: <Product /> },
	],
}));

// all routes array needed for creating routes witch useRoutes() hook
const ROUTES = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: '/kategorie',
				element: <CategoriesList />,
			},
			...categoriesRoutesArr,
			{ path: '/login', element: <Login /> },
			{ path: '/admin', element: <Admin /> },
			{ path: '*', element: <NoMatch /> },
		],
	},
];

export default ROUTES;

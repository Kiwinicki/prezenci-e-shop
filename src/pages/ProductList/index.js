import { useLocation } from "react-router";

const Category = () => {
	const location = useLocation();
	console.log(location);

	return <p>category or searching word: {location.pathname}</p>;
};

export default Category;

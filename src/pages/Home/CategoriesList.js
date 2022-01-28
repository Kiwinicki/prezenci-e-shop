import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Button, ListItem, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Loader from "../../components/Loader";

import { getCategoriesList } from "../../features/Categories";

const CategoriesList = () => {
	const categoriesArr = useSelector((state) => state.categories.value);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoriesList());
	}, []);

	return (
		<List sx={{ width: "100%", padding: 0 }}>
			{categoriesArr.length > 5 ? (
				<>
					{categoriesArr.slice(0, 5).map(({ path, name, key }) => (
						<CategoryListItem name={name} path={path} key={key} />
					))}
					<Button
						sx={{ width: "100%", borderRadius: 0 }}
						variant="outlined"
						component={RouterLink}
						to="/kategorie"
					>
						Wszystkie kategorie
					</Button>
				</>
			) : categoriesArr.length > 0 ? (
				categoriesArr.map(({ path, name, key }) => (
					<CategoryListItem name={name} path={path} key={key} />
				))
			) : (
				<Loader />
			)}
		</List>
	);
};

export default CategoriesList;

const CategoryListItem = ({ path, name }) => (
	<ListItem disableGutters divider button sx={{ p: 0 }}>
		<Link
			component={RouterLink}
			to={path}
			sx={{
				color: "grey.800",
				textDecoration: "none",
				width: "100%",
				textAlign: "center",
				py: 1.5,
			}}
		>
			<Typography>{name}</Typography>
		</Link>
	</ListItem>
);

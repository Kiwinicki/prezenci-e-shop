import { Typography, Box } from "@mui/material";

// hooks
import useQueryDocs from "../../hooks/useQueryDocs";

// firebase stuff
import { prodRef } from "../../firebase-config";

// utility functions
import slugifyString from "../../utils/slugifyString";

// custom components
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import { useSelector } from "react-redux";

const now = new Date();

const NewProductsList = () => {
	// fetch last 4 products from firebase
	const productArr = useQueryDocs({
		ref: prodRef,
		limitAmount: 4,
		fieldName: "timestamp",
		comparsionStr: "<=",
		value: now,
	});

	const categories = useSelector((state) => state.categories.value);
	console.log(categories);

	return (
		<>
			{productArr?.length > 0 ? (
				<Box>
					<Box
						sx={{
							display: "grid",
							gridTemplateRows: { xs: "repeat(4, 1fr)", sm: "repeat(2, 1fr)", md: "1fr" },
							gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
							gap: 2,
							px: 2,
							pb: 2,
						}}
					>
						{productArr.map((prod, i) => {
							// FIXME: wywala błąd
							const categoryPath =
								categories.length !== 0
									? categories.find((el) => el.key === prod.category)?.path
									: "";
							console.log("category path: ", categoryPath);
							return (
								<ProductCard
									img={prod.imgURLs[0]}
									price={prod.price}
									name={prod.name}
									// FIXME: chyba inaczej to trzeba zrobić z react-router :prodId
									path={`${categoryPath}/${slugifyString(prod.name)}`}
									key={i}
								/>
							);
						})}
					</Box>
				</Box>
			) : productArr?.length === 0 ? (
				<Loader />
			) : (
				<Typography>Nie udało się pobrać produktów</Typography>
			)}
		</>
	);
};

export default NewProductsList;

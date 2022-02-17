import { Link as RouterLink } from "react-router-dom";
import { Typography, Box, Button, useMediaQuery, useTheme, Grid } from "@mui/material";

import useQueryDocs from "../../hooks/useQueryDocs";

import { prodRef } from "../../firebase-config";

import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";

const now = new Date(); // TODO: zrobić by wartość się nie zmieniała i nie wysyłać co chwilę zapytań do bazy

const NewProductsList = () => {
	// fetch last 4 products from firebase
	const productArr = useQueryDocs({
		ref: prodRef,
		limitAmount: 4,
		fieldName: "timestamp",
		comparsionStr: "<=",
		value: now,
	});

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
						{productArr.map((prod, i) => (
							<ProductCard img={prod.imgURLs[0]} imgAlt="zdjęcie produktu" key={i}>
								<Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.dark" }}>
									{prod.price}
								</Typography>
								<Typography fontWeight="bold">{prod.name}</Typography>
							</ProductCard>
						))}
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

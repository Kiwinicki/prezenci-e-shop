import React from "react";
import { Container, Typography, Card, CardMedia, CardContent } from "@mui/material";

import useQueryDocs from "../../hooks/useQueryDocs";

import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";

import { prodRef } from "../../firebase-config";

const NewProducts = () => {
	const monthAgo = new Date(Date.now() - 2592000000); // 2592000000 is month in milliseconds

	const productArr = useQueryDocs({
		ref: prodRef,
		limitAmount: 5,
		fieldName: "timestamp",
		comparsionStr: ">=",
		value: monthAgo,
	});

	return (
		<Container>
			{productArr?.length > 0 ? (
				productArr.map((el, i) => (
					<ProductCard img={el.imgURLs[0]} key={i}>
						<Typography variant="h5">{el.name}</Typography>
					</ProductCard>
				))
			) : productArr?.length === 0 ? (
				<Loader />
			) : (
				<Typography>Nie udało się pobrać produktów</Typography>
			)}
		</Container>
	);
};

export default NewProducts;

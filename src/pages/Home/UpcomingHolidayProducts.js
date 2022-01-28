import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import useQueryDocs from "../../hooks/useQueryDocs";

import { prodRef } from "../../firebase-config";

import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import Carousel from "../../components/Carousel";

import { getHolidayKey } from "../../features/UpcomimgHoliday";

const UpcomingHolidayProducts = () => {
	const upcomingHolidayObj = useSelector((state) => state.upcomingHoliday.value);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHolidayKey());
	}, []);

	const productArr = useQueryDocs({
		ref: prodRef,
		limitAmount: 8,
		fieldName: "category",
		comparsionStr: "==",
		value: upcomingHolidayObj.key,
	});

	return (
		<div>
			<Carousel>
				{productArr?.length > 0 ? (
					productArr.map((prod, i) => (
						<ProductCard img={prod.imgURLs[0]} imgAlt="zdjęcie produktu" key={i}>
							<Typography variant="h5">{prod.name}</Typography>
						</ProductCard>
					))
				) : productArr?.length === 0 ? (
					<Loader />
				) : (
					<Typography>Nie udało się pobrać produktów</Typography>
				)}
			</Carousel>
			<Button
				sx={{ width: "100%", borderRadius: 0 }}
				variant="outlined"
				component={RouterLink}
				to={upcomingHolidayObj.path}
			>
				Zobacz więcej
			</Button>
		</div>
	);
};

export default UpcomingHolidayProducts;

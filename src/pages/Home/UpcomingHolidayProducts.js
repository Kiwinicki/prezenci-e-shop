import { useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import useQueryDocs from "../../hooks/useQueryDocs";

import { prodRef } from "../../firebase-config";

import Loader from "../../components/Loader";
import CarouselItem from "../../components/CarouselItem";
import Carousel from "../../components/Carousel";
import SectionEndButton from "../../components/SectionEndButton";

import { getHolidayKey } from "../../features/UpcomimgHoliday";

const UpcomingHolidayProducts = () => {
	const upcomingHolidayObj = useSelector((state) => state.upcomingHoliday.value);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHolidayKey());
	}, []);

	const productArr = useQueryDocs({
		ref: prodRef,
		limitAmount: 10,
		fieldName: "category",
		comparsionStr: "==",
		value: upcomingHolidayObj.key,
	});

	return (
		<>
			{productArr?.length > 0 ? (
				<Carousel>
					{productArr.map((prod, i) => (
						<CarouselItem img={prod.imgURLs[0]} imgAlt="zdjęcie produktu" key={i}>
							<Typography
								variant="h4"
								sx={{ fontWeight: "bold", color: "primary.dark", textAlign: "center" }}
							>
								{prod.price}
							</Typography>
							<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>{prod.name}</Typography>
						</CarouselItem>
					))}
				</Carousel>
			) : productArr?.length === 0 ? (
				<Loader />
			) : (
				<Typography>Nie udało się pobrać produktów</Typography>
			)}
			<SectionEndButton component={RouterLink} to="/kategorie">
				Zobacz więcej
			</SectionEndButton>
		</>
	);
};

export default UpcomingHolidayProducts;

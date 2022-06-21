import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@mui/material";

import { useSelector } from "react-redux";
import useQueryDocs from "../../hooks/useQueryDocs";

import { prodRef } from "../../firebase-config";

import Loader from "../../components/Loader";
import CarouselItem from "../../components/Carousel/CarouselItem";
import Carousel from "../../components/Carousel/Carousel";
import SectionEndButton from "../../components/SectionEndButton";

const UpcomingHolidayProducts = () => {
	const upcomingHolidayObj = useSelector((state) => state.upcomingHoliday.value);
	const categories = useSelector((state) => state.categories.value);

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
					{productArr.map((prod, i) => {
						const categorySlug =
							(categories.length !== 0 && categories.find((el) => el.key === prod.category).slug) ||
							"";

						return (
							<CarouselItem
								path={`/szukaj/${categorySlug}/${prod.id}`}
								img={prod.imgURLs[0]}
								imgAlt="zdjęcie produktu"
								key={i}
							>
								<Typography
									variant="h4"
									sx={{ fontWeight: "bold", color: "primary.dark", textAlign: "center" }}
								>
									{prod.price}
								</Typography>
								<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
									{prod.name}
								</Typography>
							</CarouselItem>
						);
					})}
				</Carousel>
			) : productArr?.length === 0 ? (
				<Loader />
			) : (
				<Typography>Nie udało się pobrać produktów</Typography>
			)}
			<SectionEndButton component={RouterLink} to={`szukaj/${upcomingHolidayObj.slug || ""}`}>
				Zobacz więcej
			</SectionEndButton>
		</>
	);
};

export default UpcomingHolidayProducts;

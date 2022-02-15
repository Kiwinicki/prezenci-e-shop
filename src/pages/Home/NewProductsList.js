import { Link as RouterLink } from "react-router-dom";
import { Typography, Box, Button, useMediaQuery, useTheme, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import useQueryDocs from "../../hooks/useQueryDocs";
import useCurrentWidth from "../../hooks/useCurrentWidth";

import { prodRef } from "../../firebase-config";

import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import CarouselItem from "../../components/CarouselItem";
import Carousel from "../../components/Carousel";

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

	// const currentWindowWidth = useCurrentWidth();

	// const theme = useTheme();
	// const isBiggerThanMdBreakpoint = useMediaQuery(theme.breakpoints.up("md"));

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
							// <Box
							// 	// item sx={{ flexBasis: { xs: "100%", sm: "50%", md: "25%" } }}
							// 	key={i}
							// >
							<ProductCard img={prod.imgURLs[0]} imgAlt="zdjęcie produktu" key={i}>
								<Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.dark" }}>
									{prod.price}
								</Typography>
								<Typography fontWeight="bold">{prod.name}</Typography>
							</ProductCard>
							// </Box>
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

// const DesktopCarousel = ({ currentWindowWidth, productArr }) => (
// 	<Carousel itemWidth={{ minWidth: 140, middleWidth: currentWindowWidth * 0.2, maxWidth: 320 }}>
// 		{productArr.map((prod, i) => (
// 			<CarouselItem img={prod.imgURLs[0]} imgAlt="zdjęcie produktu" key={i}>
// 				<Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.dark" }}>
// 					{prod.price}
// 				</Typography>
// 				<Typography
// 					sx={
// 						{
// 							// typography: { xs: "body2", md: "body1" }
// 						}
// 					}
// 				>
// 					{prod.name}
// 				</Typography>
// 			</CarouselItem>
// 		))}
// 	</Carousel>
// );

// const MoblieList = ({ productArr }) => (
// 	<>
// 		{productArr.map((prod, i) => (
// 			<ProductCard img={prod.imgURLs[0]} key={i}>
// 				<Box
// 					sx={{
// 						display: "flex",
// 						gap: "10px",
// 						justifyContent: "space-between",
// 						alignItems: "center",
// 					}}
// 				>
// 					<Typography
// 						variant="body1"
// 						sx={{
// 							overflow: "hidden",
// 							display: "-webkit-box",
// 							WebkitLineClamp: "3",
// 							WebkitBoxOrient: "vertical",
// 							flexGrow: "1",
// 						}}
// 					>
// 						{prod.name}
// 					</Typography>
// 					<Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
// 						<Typography variant="h3" sx={{ fontWeight: "bold", color: "primary.dark" }}>
// 							{prod.price}
// 						</Typography>
// 						<Button variant="contained" sx={{ margin: "0 0 0 auto", maxWidth: "fit-content" }}>
// 							<AddShoppingCartIcon />
// 						</Button>
// 					</Box>
// 				</Box>
// 			</ProductCard>
// 		))}
// 		<Button
// 			sx={{ width: "100%", borderRadius: 0 }}
// 			variant="outlined"
// 			component={RouterLink}
// 			to="/nowosci"
// 		>
// 			Wszystkie nowości
// 		</Button>
// 	</>
// );

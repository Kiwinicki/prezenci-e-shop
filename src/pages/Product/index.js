import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	Breadcrumbs,
	Typography,
	Link,
	ButtonGroup,
	Button,
	TextField,
	Input,
	Grid,
	Box,
	styled,
	ButtonBase,
} from "@mui/material";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams, Link as RouterLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db, prodRef } from "../../firebase-config";

// custom components
import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import Loader from "../../components/Loader";
import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";

import {
	useLoadingStateMachine,
	states as loadingStates,
} from "../../hooks/useLoadingStateMachine";
import useQueryDocs from "../../hooks/useQueryDocs";
import { useSelector } from "react-redux";
import useQuerySingleDoc from "../../hooks/useQuerySingleDoc";

const Product = () => {
	const urlParams = useParams();

	const [productAmount, setProductAmount] = useState(1);
	const [compareProdState, updateProdLoadingState] = useLoadingStateMachine();

	const docRef = doc(db, "products", urlParams.productId);
	const productData = useQuerySingleDoc({ docRef, updateLoadingStateFn: updateProdLoadingState });

	// category key needed to fetch other products data
	const categoriesArr = useSelector((state) => state.categories.value);
	const categoryObj = categoriesArr.find((el) => el.slug === urlParams.categorySlug);

	// carousel products data and loading state
	const [compareCarouselState, updateCarouselLoadingState] = useLoadingStateMachine();
	const carouselItemsData = useQueryDocs({
		ref: prodRef,
		fieldName: "category",
		comparsionStr: "==",
		value: categoryObj.key || "",
		limitAmount: 8,
		updateLoadingStateFn: updateCarouselLoadingState,
	});

	return (
		<SectionWrapper sx={{ p: 2 }}>
			<Breadcrumbs aria-label="breadcrumb" sx={{ "& *": { fontSize: "0.75rem" } }}>
				<Link component={RouterLink} to="/" underline="hover" color="inherit">
					Strona główna
				</Link>
				<Link
					component={RouterLink}
					to={`/szukaj/${urlParams.categorySlug}`}
					underline="hover"
					color="inherit"
				>
					Kategorie
				</Link>
				<Link component={RouterLink} to="#" underline="hover" color="inherit">
					<LoadingStateManager
						compareStateFn={compareProdState}
						isLoadingComponent={<>Ładowanie...</>}
						hasLoadedComponent={<>{productData?.name && productData.name}</>}
					/>
				</Link>
			</Breadcrumbs>
			<Box
				sx={{
					display: "grid",
					gap: 2,
					gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "60% 1fr" },
					// TODO: dokończyć dla większych ekranów
					gridTemplateAreas: {
						xs: `"img img" "name name" "price price" "buy buy" "desc desc" "carousel carousel"`,
						sm: `"img img" "name name" "price buy" "desc desc" "carousel carousel"`,
						md: `"img name" "img price" "img buy" "desc desc" "carousel carousel"`,
					},
				}}
			>
				{/* Product image/s */}
				<Box sx={{ gridArea: "img", display: "flex", justifyContent: "center" }}>
					{/* TODO: slider ze zdjęciami */}
					<LoadingStateManager
						compareStateFn={compareProdState}
						hasLoadedComponent={<StyledImg src={productData?.imgURLs[0]} alt="" />}
					/>
				</Box>
				{/* Product name */}
				<Box
					sx={{ gridArea: "name", display: "flex", alignItems: "center", justifyContent: "center" }}
				>
					<LoadingStateManager
						compareStateFn={compareProdState}
						hasLoadedComponent={<SectionHeading>{productData?.name}</SectionHeading>}
					/>
				</Box>
				{/* Product price and amount */}
				<Box
					sx={{
						gridArea: "price",
						display: "flex",
						flexDirection: { sm: "column", md: "row" },
						justifyContent: "space-between",
						// alignContent: "center",
						gap: 1,
						flexWrap: "wrap",
					}}
				>
					<LoadingStateManager
						compareStateFn={compareProdState}
						hasLoadedComponent={
							<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
								<Typography>cena:</Typography>
								<Typography
									sx={{
										fontWeight: "bold",
										fontSize: "2rem",
										lineHeight: "1",
										color: "primary.dark",
										height: "min-content",
										textAlign: "center",
									}}
								>
									{productData?.price || ""}
								</Typography>
							</Box>
						}
					/>
					<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
						<Typography>ilość:</Typography>
						<ButtonGroup variant="contained" sx={{ width: "min-content", height: "min-content" }}>
							<Button
								onClick={() => setProductAmount((prev) => (prev < 999 ? prev + 1 : 999))}
								{...(productAmount >= 999 && { disabled: true })}
								sx={{ border: "none !important", width: "3rem" }}
							>
								<AddIcon />
							</Button>
							<Box
								sx={{
									width: "3.5rem",
									border: "3px solid",
									borderColor: "primary.main",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									lineHeight: "1",
									fontWeight: "bolder",
								}}
							>
								{productAmount}
							</Box>
							<Button
								onClick={() => setProductAmount((prev) => (prev > 1 ? prev - 1 : 1))}
								{...(productAmount <= 1 && { disabled: true })}
								sx={{
									border: "none !important",
									width: "3rem",
								}}
							>
								<RemoveIcon />
							</Button>
						</ButtonGroup>
					</Box>
				</Box>
				{/* "Buy now" and "Add to cart" buttons */}
				<Box sx={{ gridArea: "buy", display: "flex", flexDirection: "column", gap: 1 }}>
					<Button variant="contained">Kup teraz</Button>
					<Button variant="contained">Dodaj do koszyka</Button>
				</Box>
				{/* Product description */}
				<Box sx={{ gridArea: "desc", display: "flex", flexDirection: "column", gap: 1 }}>
					<Typography component="h3" sx={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
						Opis produktu
					</Typography>
					<LoadingStateManager
						compareStateFn={compareProdState}
						isLoadingComponent={<span>Ładowanie ceny...</span>}
						hasLoadedComponent={
							<Typography>{productData?.description || "Brak opisu dla tego produktu."}</Typography>
						}
					/>
				</Box>
				{/* Carousel with simmilar products(the same category) */}
				<Box sx={{ gridArea: "carousel", display: "flex", flexDirection: "column", gap: 1 }}>
					<Typography component="h3" sx={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
						Inne produkty z tej kategorii
					</Typography>
					{carouselItemsData?.length > 0 ? (
						<Carousel>
							{carouselItemsData.map((prod, i) => (
								<CarouselItem img={prod.imgURLs[0]} imgAlt="zdjęcie produktu" key={i}>
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
							))}
						</Carousel>
					) : carouselItemsData?.length === 0 ? (
						<Loader />
					) : (
						<Typography>Nie udało się pobrać produktów</Typography>
					)}
					<Link
						component={RouterLink}
						to={`/szukaj/${urlParams.categorySlug}`}
						sx={{ maxWidth: "fit-content" }}
					>
						Zobacz więcej produktów z kategorii {categoryObj.name}
					</Link>
				</Box>
			</Box>
		</SectionWrapper>
	);
};

export default Product;

const StyledImg = styled("img")({
	width: "100%",
	maxWidth: "450px",
	margin: "0 auto",
});

const LoadingStateManager = ({
	compareStateFn,
	isLoadingComponent = <Loader />,
	hasLoadedComponent,
	hasErrorComponent = <span style={{ color: "red" }}>Wystąpił błąd przy ładowaniu komponentu</span>,
}) => {
	return (
		<>
			{compareStateFn(loadingStates.isLoading) && isLoadingComponent}
			{compareStateFn(loadingStates.hasLoaded) && hasLoadedComponent}
			{compareStateFn(loadingStates.hasError) && hasErrorComponent}
		</>
	);
};

LoadingStateManager.propTypes = {
	compareStateFn: PropTypes.func.isRequired,
	isLoadingComponent: PropTypes.element,
	hasLoadedComponent: PropTypes.element.isRequired,
	hasErrorComponent: PropTypes.element,
};

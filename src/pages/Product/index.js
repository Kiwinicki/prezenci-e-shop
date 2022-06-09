import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Breadcrumbs, Typography, Link, Button, Box, styled } from "@mui/material";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc } from "firebase/firestore";

import { db, prodRef } from "../../firebase-config";

// custom components
import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import Loader from "../../components/Loader";
import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";
import ChangeAmountButtonGroup from "../../components/ChangeAmountButtonGroup";

import {
	useLoadingStateMachine,
	states as loadingStates,
} from "../../hooks/useLoadingStateMachine";
import useQueryDocs from "../../hooks/useQueryDocs";
import useQuerySingleDoc from "../../hooks/useQuerySingleDoc";

// redux
import { increaseProductAmountInCart, decreaseProductAmountInCart } from "../../features/Cart";

const Product = () => {
	const urlParams = useParams();
	const [compareProdState, updateProdLoadingState] = useLoadingStateMachine();

	const navigate = useNavigate();

	const [docRef, setDocRef] = useState(null); // doc(db, "products", urlParams.productId)

	// cart(redux)
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.value);
	const productInCart = cart[urlParams.productId] || { amount: 0 };

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	// update docRef when urlParams changes e.g. when click on other product page
	useEffect(() => {
		setDocRef(doc(db, "products", urlParams.productId));
	}, [urlParams]);

	const productData = useQuerySingleDoc({
		docRef,
		updateLoadingStateFn: updateProdLoadingState,
	});

	// category key needed to fetch other products data
	const categoriesArr = useSelector((state) => state.categories.value);
	const categoryObj = categoriesArr.find((el) => el.slug === urlParams.categorySlug);

	// carousel products data and loading state
	const [compareCarouselState, updateCarouselLoadingState] = useLoadingStateMachine();
	const carouselItemsData = useQueryDocs({
		ref: prodRef,
		fieldName: "category",
		comparsionStr: "==",
		value: categoryObj?.key || "",
		limitAmount: 8,
		updateLoadingStateFn: updateCarouselLoadingState,
	});

	return (
		<SectionWrapper sx={{ p: 2 }}>
			{/* Breadcrumb */}
			<Breadcrumbs aria-label="breadcrumb" sx={{ "& *": { fontSize: "0.75rem" } }}>
				<Link component={RouterLink} to="/" underline="hover" color="inherit">
					Strona główna
				</Link>
				<Link
					component={RouterLink}
					to={`/szukaj/${urlParams.categorySlug || ""}`}
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
						gap: 1,
						flexWrap: "wrap",
					}}
				>
					{/* Price */}
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
									{`${productData?.price} zł` || "Ładowanie ceny..."}
								</Typography>
							</Box>
						}
					/>
					{/* Buttons to changing quantity */}
					<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
						<Typography>ilość:</Typography>
						<ChangeAmountButtonGroup
							prod={productInCart}
							increaseClickHandler={() =>
								dispatch(
									increaseProductAmountInCart({
										[urlParams.productId]: {
											name: productData.name,
											price: productData.price,
											categorySlug: urlParams.categorySlug,
										},
									})
								)
							}
							decreaseClickHandler={() =>
								dispatch(
									decreaseProductAmountInCart({
										[urlParams.productId]: {
											name: productData.name,
											price: productData.price,
											categorySlug: urlParams.categorySlug,
										},
									})
								)
							}
						/>
					</Box>
				</Box>
				{/* "Buy now" and "Add to cart" buttons */}
				<Box sx={{ gridArea: "buy", display: "flex", flexDirection: "column", gap: 1 }}>
					<Button
						variant="contained"
						// if product amount is equal 0, then firstly increase amount and after that redirect to /konto/koszyk
						onClick={() => {
							if (productInCart.amount === 0) {
								dispatch(
									increaseProductAmountInCart({
										[urlParams.productId]: {
											name: productData.name,
											price: productData.price,
											categorySlug: urlParams.categorySlug,
										},
									})
								);
							}
							isLoggedIn ? navigate("/konto/koszyk") : navigate("/logowanie");
						}}
					>
						Kup teraz
					</Button>
					<Button
						variant="contained"
						onClick={() => (isLoggedIn ? navigate("/konto/koszyk") : navigate("/logowanie"))}
					>
						Przejdź do koszyka
					</Button>
				</Box>
				{/* Product description */}
				<Box sx={{ gridArea: "desc", display: "flex", flexDirection: "column", gap: 1 }}>
					<Typography component="h3" sx={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
						Opis produktu
					</Typography>
					<LoadingStateManager
						compareStateFn={compareProdState}
						isLoadingComponent={<span>Ładowanie opisu...</span>}
						hasLoadedComponent={
							<Typography>{productData?.description || "Brak opisu dla tego produktu."}</Typography>
						}
					/>
				</Box>
				{/* Carousel with simmilar products(same category) */}
				<Box sx={{ gridArea: "carousel", display: "flex", flexDirection: "column", gap: 1 }}>
					<Typography component="h3" sx={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
						Inne produkty z tej kategorii
					</Typography>
					{carouselItemsData?.length > 0 ? (
						<Carousel>
							{carouselItemsData.map((prod, i) => (
								<CarouselItem
									path={`/szukaj/${urlParams.categorySlug}/${prod.id}`}
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
						Zobacz więcej produktów z kategorii {categoryObj?.name}
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

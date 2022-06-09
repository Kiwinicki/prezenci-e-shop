import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Stepper, Step, StepLabel } from "@mui/material";

import EmptyCartImg from "../../assets/empty-cart.svg";

import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import CartItem from "./CartItem";

import { clearCart } from "../../features/Cart";

const CartPage = () => {
	const productsInCart = useSelector((state) => state.cart.value);
	const dispatch = useDispatch();

	const sumToPay = Object.values(productsInCart).reduce(
		(sum, prod) => (sum += prod.price * prod.amount),
		0
	);

	return (
		<>
			<SectionWrapper sx={{ p: 2 }}>
				<SectionHeading>Koszyk</SectionHeading>
				<Stepper activeStep={0}>
					<Step>
						<StepLabel>Koszyk</StepLabel>
					</Step>
					<Step>
						<StepLabel>Dostawa i płatność</StepLabel>
					</Step>
					<Step>
						<StepLabel>Gotowe</StepLabel>
					</Step>
				</Stepper>
				{Object.keys(productsInCart).length > 0 ? (
					<Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
						{/* Cart content list */}
						<Box sx={{ flexBasis: "75vw", display: "flex", flexDirection: "column", gap: 2 }}>
							{Object.entries(productsInCart).map(([id, prod]) => (
								<CartItem id={id} prod={prod} key={id} />
							))}
						</Box>
						{/* Price to pay and go to next step button */}
						<Box
							sx={{
								...paperStyles,
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}
						>
							{/* Price to pay */}
							<Box
								sx={{
									display: "flex",
									flexWrap: "wrap",
									columnGap: 1,
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography component="span" sx={{ fontWeight: "bold" }}>
									DO ZAPŁATY:
								</Typography>
								<Typography
									component="span"
									sx={{ fontWeight: "bold", fontSize: "1.6rem", whiteSpace: "nowrap" }}
								>
									{sumToPay.toFixed(2)} zł
								</Typography>
								<Typography variant="subtitle2" component="p" sx={{ flexBasis: "100%" }}>
									{sumToPay > 150 ? "DARMOWA DOSTAWA" : "+ DOSTAWA"}
								</Typography>
							</Box>
							{/* Clear cart button */}
							<Button variant="contained" onClick={() => dispatch(clearCart())}>
								Wyczyść koszyk
							</Button>
							{/* Order button */}
							<Button component={RouterLink} to="/konto/zamowienie" variant="contained">
								Dostawa i płatność
							</Button>
						</Box>
					</Box>
				) : (
					<Box sx={{ display: "flex", flexWrap: "wrap" }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
								gap: 2,
								px: 2,
							}}
						>
							<Box>
								<Typography variant="h4">Twój koszyk jest pusty</Typography>
								<Typography>Dodaj produkty do koszyka by móc je zamówić</Typography>
							</Box>
							<Button
								component={RouterLink}
								to="/"
								variant="contained"
								sx={{ width: "fit-content", mx: "auto" }}
							>
								Przejdź do strony głównej
							</Button>
						</Box>
						<Box
							component="img"
							src={EmptyCartImg}
							alt="Człowiek stojący przy koszyku sklepowym"
							sx={{ width: "80vw", maxWidth: "500px", margin: "auto", py: 2 }}
						/>
					</Box>
				)}
			</SectionWrapper>
		</>
	);
};

export default CartPage;

const paperStyles = {
	bgcolor: "grey.100",
	borderRadius: "12px",
	border: "5px solid",
	borderColor: "grey.100",
	boxShadow: "none",
	p: 1,
};

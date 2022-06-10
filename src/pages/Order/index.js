import { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Box, Typography, Button, List, ListItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import SelectedProductsList from "./SelectedProductsList";
import PaymentMethod from "./PaymentMethod";
import ShipmentDetails from "./ShipmentDetails";

import { updateAuthState } from "../../features/Auth";

const OrderPage = () => {
	const userInfo = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const productsInCart = useSelector((state) => state.cart.value);
	const sumToPay = Object.values(productsInCart).reduce(
		(sum, prod) => (sum += prod.price * prod.amount),
		0
	);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [formData, setFormData] = useState(null);
	const [currentStep, setCurrentStep] = useState(1);

	const onSubmit = (data) => {
		console.log(data);
		setFormData(data);
		dispatch(updateAuthState({ address: data.address, phone: data.phone }));
		setCurrentStep((prevStep) => prevStep + 1);
	};

	useEffect(() => {
		Object.keys(errors).length !== 0 && console.log(errors);
	}, [errors]);

	return (
		<SectionWrapper sx={{ p: 2 }}>
			<SectionHeading>Dostwa i płatność</SectionHeading>
			<Stepper activeStep={currentStep}>
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
			{currentStep === 1 && (
				<FirstStepContent
					{...{
						register,
						errors,
						control,
						userInfo,
						productsInCart,
						sumToPay,
						submitHandler: handleSubmit(onSubmit),
					}}
				/>
			)}
			{currentStep === 2 && (
				<SecondStepContent {...{ formData, products: productsInCart, sumToPay, userInfo }} />
			)}
		</SectionWrapper>
	);
};

export default OrderPage;

const paperStyles = {
	bgcolor: "grey.100",
	borderRadius: "12px",
	border: "5px solid",
	borderColor: "grey.100",
	boxShadow: "none",
	p: 1,
};

const FirstStepContent = ({
	register,
	errors,
	control,
	userInfo,
	productsInCart,
	sumToPay,
	submitHandler,
}) => (
	<Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
		<Box
			component="form"
			sx={{
				...paperStyles,
				flexBasis: "75vw",
				display: "flex",
				flexDirection: "column",
				rowGap: 3,
			}}
		>
			<ShipmentDetails register={register} userInfo={userInfo} />
			<SelectedProductsList cart={productsInCart} />
			<PaymentMethod control={control} errors={errors} register={register} />
		</Box>
		<Box
			sx={{
				...paperStyles,
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<Typography variant="h5" component="h3" fontWeight="bold">
				Podsumowanie
			</Typography>

			<Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
				<Typography component="span">Wartość produktów:</Typography>
				<Typography component="span" sx={{ whiteSpace: "nowrap" }}>
					{sumToPay} zł
				</Typography>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
				<Typography component="span" sx={{ whiteSpace: "nowrap" }}>
					Koszt dostawy:
				</Typography>
				<Typography component="span" sx={{ whiteSpace: "nowrap" }}>
					{sumToPay > 150 ? "0.00 zł" : "9.99 zł"}
				</Typography>
			</Box>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					gap: 1,
					flexWrap: "wrap",
					alignItems: "center",
				}}
			>
				<Typography component="span" sx={{ fontWeight: "bold" }}>
					DO ZAPŁATY
				</Typography>
				<Typography
					component="span"
					sx={{ fontWeight: "bold", fontSize: "1.6rem", whiteSpace: "nowrap" }}
				>
					{sumToPay > 150 ? sumToPay : (sumToPay + 9.99).toFixed(2)} zł
				</Typography>
			</Box>

			<Button variant="contained" type="submit" onClick={submitHandler}>
				Zamawiam
			</Button>
		</Box>
	</Box>
);

const SecondStepContent = ({ formData, products, sumToPay, userInfo }) => (
	<Box sx={{ ...paperStyles, gap: 2, display: "flex", flexDirection: "column" }}>
		<Typography sx={{ textAlign: "center" }}>
			Dziękujemy za zakupy! Zamówienie zostało złożone do realizacji. Oto krótkie podsumowanie:
		</Typography>
		<Typography>Suma do zapłaty: {sumToPay} zł</Typography>
		<Typography>Forma płatności: {formData.payment}</Typography>
		<Typography>Adres dostawy: ul. {userInfo.address}</Typography>
		{formData.invoice && (
			<Typography>Faktura została wysłana na adres e-mail (tak serio to nie)</Typography>
		)}
		<Typography>Zamówione produkty:</Typography>
		<List>
			{Object.entries(products).map(([key, prod]) => (
				<ListItem
					key={key}
					divider
					sx={{ display: "flex", columnGap: 2, justifyContent: "space-between" }}
				>
					<Typography>{prod.amount} szt.</Typography>
					<Typography>{prod.name}</Typography>
					<Typography>{prod.price} zł</Typography>
				</ListItem>
			))}
		</List>
	</Box>
);

import { Box, Button, Alert, Typography } from "@mui/material";

const formStyles = { display: "flex", flexDirection: "column", gap: 1.5 };

const FormContainer = ({
	children,
	submitHandler,
	formTitle,
	submitBtnText = "Wyślij",
	submitErrorText = "Wysyłanie formularza nie powiodło się",
	submitSuccessText = "Wysyłanie formularza powiodło się",
	formSubmitState = null,
}) => {
	return (
		<Box component="form" autoComplete="off" onSubmit={submitHandler} sx={formStyles}>
			<Typography variant="h4" component="h2" sx={{ textAlign: "center", marginTop: 3 }}>
				{formTitle}
			</Typography>
			{children}
			{formSubmitState ? (
				<Alert severity="success">{submitSuccessText}</Alert>
			) : formSubmitState === false ? (
				<Alert severity="error">{submitErrorText}</Alert>
			) : null}

			{/* TODO: przy wysyłaniu powinien pojawić się spinner ładowania  */}
			<Button type="submit" variant="contained">
				{submitBtnText}
			</Button>
		</Box>
	);
};

export default FormContainer;

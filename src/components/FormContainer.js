import { Box, Alert } from "@mui/material";

const FormContainer = ({
	children,
	submitHandler,
	submitErrorText = "Wysyłanie formularza nie powiodło się",
	submitSuccessText = "Wysyłanie formularza powiodło się",
	formSubmitState = null,
	sx,
}) => {
	return (
		<Box component="form" autoComplete="off" onSubmit={submitHandler} sx={sx}>
			{children}
			{formSubmitState ? (
				<Alert severity="success">{submitSuccessText}</Alert>
			) : formSubmitState === false ? (
				<Alert severity="error">{submitErrorText}</Alert>
			) : null}
		</Box>
	);
};

export default FormContainer;

import { Box, Alert } from "@mui/material";

const FormContainer = ({
	children,
	onSubmit,
	submitErrorText = "Wysyłanie formularza nie powiodło się",
	submitSuccessText = "Wysyłanie formularza powiodło się",
	formSubmitState = null,
	sx,
}) => {
	return (
		<Box component="form" autoComplete="off" onSubmit={onSubmit} sx={sx}>
			{children}
			{formSubmitState === true ? (
				<Alert severity="success">{submitSuccessText}</Alert>
			) : formSubmitState === false ? (
				<Alert severity="error">{submitErrorText}</Alert>
			) : null}
		</Box>
	);
};

export default FormContainer;

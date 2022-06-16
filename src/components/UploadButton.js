import { Button, Alert, styled } from "@mui/material";

const UploadButton = ({
	registerFn,
	errorsObj = {},
	name,
	buttonText = "",
	alertText = "Wybierz plik",
	multiple = false,
	acceptFileTypes = "",
	required,
}) => {
	const uniqueID = `file-upload-btn`;
	const register = () => registerFn(name, { ...(required && { required: true }) });

	return (
		<>
			<UploadLabel htmlFor={uniqueID}>
				<HiddenInput
					{...register()}
					accept={acceptFileTypes}
					id={uniqueID}
					type="file"
					multiple={multiple}
				/>
				<Button variant="contained" component="span">
					{buttonText}
				</Button>
			</UploadLabel>
			{errorsObj[name] && <Alert severity="warning">{alertText}</Alert>}
		</>
	);
};

export default UploadButton;

const HiddenInput = styled("input")({
	display: "none",
});

const UploadLabel = styled("label")({ width: "fit-content" });

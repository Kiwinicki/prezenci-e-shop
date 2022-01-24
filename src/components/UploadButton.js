import { Button, Alert, styled } from "@mui/material";

const UploadButton = ({
	registerFn,
	errorsObj = {},
	name,
	buttonText = "",
	alertText = "Wybierz plik",
	multiple,
	acceptFileTypes = "",
	required,
}) => {
	const uniqeID = `file-upload-btn-${Math.random() * 100}`;

	return (
		<>
			<UploadLabel htmlFor={uniqeID}>
				<HiddenInput
					{...registerFn(name, { ...(required && { required: true }) })}
					accept={acceptFileTypes}
					id={uniqeID}
					type="file"
					{...(multiple && { multiple: true })}
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

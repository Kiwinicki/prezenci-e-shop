import { Button, styled } from "@mui/material";
import { WarningAlert } from "./WarningAlert";

const UploadButton = ({
	name,
	registerFn,
	errors,
	buttonText = "",
	requiredAlert = "",
	acceptFileTypes = "",
	multiple = false,
}) => {
	const uniqueID = "file-upload-btn";
	const register = () => registerFn(name, { ...(requiredAlert && { required: requiredAlert }) });

	return (
		<>
			<UploadLabel htmlFor={uniqueID}>
				<HiddenInput
					type="file"
					{...register()}
					id={uniqueID}
					multiple={multiple}
					accept={acceptFileTypes}
					required={!!requiredAlert}
				/>
				<Button variant="contained" component="span">
					{buttonText}
				</Button>
			</UploadLabel>
			{errors && <WarningAlert message={requiredAlert} />}
		</>
	);
};

export default UploadButton;

const HiddenInput = styled("input")({
	display: "none",
});

const UploadLabel = styled("label")({ width: "fit-content" });

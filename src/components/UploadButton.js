import { Button, styled } from "@mui/material";
import { Controller } from "react-hook-form";
import { WarningAlert } from "./WarningAlert";

const UploadButton = ({
	name,
	control,
	buttonText = "",
	requiredAlert = "",
	acceptFileTypes = "",
	multiple = false,
}) => {
	const uniqueID = "file-upload-btn";
	// FIXME: gdy dodam to wywala kilkanaście pustych paragrafów
	// FIXME: gdy dodam to alert nie znika
	return (
		<Controller
			render={({ field, fieldState: { error } }) => (
				<>
					<UploadLabel htmlFor={uniqueID}>
						<HiddenInput
							{...field}
							accept={acceptFileTypes}
							id={uniqueID}
							type="file"
							multiple={multiple}
						/>
						<Button variant="contained" component="span">
							{buttonText}
						</Button>
					</UploadLabel>
					{error && <WarningAlert message={requiredAlert} />}
				</>
			)}
			name={name}
			control={control}
			rules={{ required: !!requiredAlert }}
		/>
	);
};

export default UploadButton;

const HiddenInput = styled("input")({
	display: "none",
});

const UploadLabel = styled("label")({ width: "fit-content" });

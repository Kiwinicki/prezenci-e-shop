import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InputComponent from "./InputComponent";

const EditableInfoField = ({
	infoVal,
	infoName,
	btnLabel,
	inputName,
	inputLabel,
	registerFn,
	isFieldEdited,
	fieldToggler,
	required = false,
}) => {
	return (
		<>
			{infoVal && !isFieldEdited ? (
				<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
					<Typography>
						{infoName}: {infoVal}
					</Typography>
					<IconButton aria-label={btnLabel} onClick={fieldToggler}>
						<EditIcon />
					</IconButton>
				</Box>
			) : (
				<InputComponent
					name={inputName}
					label={inputLabel}
					defaultValue=""
					registerFn={registerFn}
					required={required}
				/>
			)}
		</>
	);
};

export default EditableInfoField;

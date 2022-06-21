import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { WarningAlert } from "./WarningAlert";

const InputComponent = ({
	name,
	control,
	inputProps = {},
	requiredAlert = "",
	label = "",
	placeholder = "",
	...other
}) => {
	return (
		<Controller
			render={({ field, fieldState: { error } }) => (
				<>
					<TextField
						{...field}
						variant="standard"
						inputProps={inputProps}
						label={label}
						required={!!requiredAlert}
						error={!!error}
						helperText={requiredAlert}
						{...(placeholder && { placeholder: placeholder })}
						{...other}
					/>
					{error && <WarningAlert message={requiredAlert} />}
				</>
			)}
			name={name}
			control={control}
			rules={{ required: requiredAlert }}
		/>
	);
};
export default InputComponent;

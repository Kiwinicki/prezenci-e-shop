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
						// FIXME: nie działa połączenie vanila i customowej walidacji
						// {...(requiredAlert && { required: true })}
						label={label}
						error={!!error}
						helperText={requiredAlert}
						placeholder={placeholder}
						{...other}
					/>
					{console.log(!!error)}
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

import { TextField, Alert } from "@mui/material";

const InputComponent = ({
	registerFn,
	errorsObj = {},
	name,
	alertText = "",
	inputProps = {},
	required = false,
	...other
}) => (
	<>
		<TextField
			{...registerFn(name, required && { required: true })}
			variant="standard"
			inputProps={inputProps}
			{...(required && required)}
			{...other}
		/>
		{required && errorsObj[name] && (
			<Alert severity="warning">{alertText && "Pole wymagane"}</Alert>
		)}
	</>
);
export default InputComponent;

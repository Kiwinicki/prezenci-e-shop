import { TextField, MenuItem, Alert } from "@mui/material";

const SelectComponent = ({
	registerFn,
	errorsObj = {},
	name,
	alertText = "Pole wymagane",
	optionsArr = [],
	required,
	...other
}) => {
	return (
		<>
			<TextField
				select
				{...registerFn(name, required && { required: true })}
				{...(required && required)}
				{...other}
			>
				{optionsArr.map((option, i) => (
					<MenuItem value={option.key} key={option.id || i}>
						{option.name}
					</MenuItem>
				))}
			</TextField>
			{errorsObj[name] && <Alert severity="warning">{alertText}</Alert>}
		</>
	);
};

export default SelectComponent;

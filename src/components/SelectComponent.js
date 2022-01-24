import { TextField, MenuItem, Alert } from "@mui/material";

const SelectComponent = ({
	registerFn,
	errorsObj = {},
	name,
	alertText = "Pole wymagane",
	optionsArr = [{ key: "", id: "", name: "" }],
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
				{optionsArr.map((option) => (
					<MenuItem value={option.key} key={option.id}>
						{option.name}
					</MenuItem>
				))}
			</TextField>
			{errorsObj[name] && <Alert severity="warning">{alertText}</Alert>}
		</>
	);
};

export default SelectComponent;

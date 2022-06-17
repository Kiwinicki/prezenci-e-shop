import { TextField, MenuItem } from "@mui/material";
import { WarningAlert } from "./WarningAlert";
import { Controller } from "react-hook-form";

const SelectComponent = ({ name, control, requiredAlert = "", optionsArr = [], ...other }) => (
	<Controller
		render={({ field, fieldState: { error } }) => (
			<>
				<TextField
					select
					{...field}
					// {...(requiredAlert && { required: true })}
					{...other}
				>
					{optionsArr.map((option, i) => (
						<MenuItem value={option.key} key={option.id || i}>
							{option.name}
						</MenuItem>
					))}
				</TextField>
				{error && <WarningAlert message={requiredAlert} />}
			</>
		)}
		name={name}
		control={control}
		rules={{ required: !!requiredAlert }}
	/>
);

export default SelectComponent;

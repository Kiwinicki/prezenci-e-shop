import { FormControl, InputLabel, Input } from "@mui/material";
import { Controller } from "react-hook-form";

export const Textarea = ({ control, name, requiredAlert = "" }) => {
	const uniqueID = "textarea-input";

	return (
		<Controller
			render={({ field, fieldState: { error } }) => (
				<FormControl variant="standard">
					<InputLabel htmlFor={uniqueID}>opis produktu</InputLabel>
					<Input
						{...field}
						{...(requiredAlert && { required: !!requiredAlert })}
						id={uniqueID}
						inputComponent="textarea"
						error={error}
						sx={{
							"& > *": { resize: "vertical", minHeight: "7ch", bgcolor: "rgba(0,0,0,0.03)" },
						}}
					/>
				</FormControl>
			)}
			name={name}
			control={control}
			rules={{ required: !!requiredAlert }}
		/>
	);
};

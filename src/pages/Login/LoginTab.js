import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

import SectionEndButton from "../../components/SectionEndButton";
import FormContainer from "../../components/FormContainer";

const LoginTab = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const submitHandler = (e) => {
		e.preventDefault();
		console.log("dupa");
	};

	return (
		<>
			<FormContainer
				sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2, pb: 2 }}
				onSubmit={handleSubmit(submitHandler)}
			>
				<TextField
					{...register("email", { required: true })}
					type="email"
					label="E-mail:"
					variant="outlined"
				/>
				<TextField
					{...register("password", { required: true, minLength: 8 })}
					type="password"
					label="Hasło:"
					variant="outlined"
				/>
			</FormContainer>
			<SectionEndButton type="submit">Zaloguj się</SectionEndButton>
		</>
	);
};

export default LoginTab;

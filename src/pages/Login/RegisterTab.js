import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

import SectionEndButton from "../../components/SectionEndButton";
import FormContainer from "../../components/FormContainer";

const RegisterTab = () => {
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
				onSubmit={handleSubmit((e) => submitHandler(e))}
			>
				<TextField
					{...register("name", { required: true })}
					label="Nazwa użytkownika:"
					variant="outlined"
				/>
				<TextField
					{...register("email", { required: true })}
					type="email"
					label="E-mail:"
					variant="outlined"
				/>
				<TextField
					{...register("password", { required: true })}
					type="password"
					label="Hasło:"
					variant="outlined"
				/>
			</FormContainer>
			<SectionEndButton type="submit">Zarejestruj się</SectionEndButton>
		</>
	);
};

export default RegisterTab;

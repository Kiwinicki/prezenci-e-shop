import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { setDoc, doc } from "@firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";

import { auth, db } from "../../firebase-config";

import SectionEndButton from "../../components/SectionEndButton";
import FormContainer from "../../components/FormContainer";

const RegisterTab = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [registerState, setRegisterState] = useState(null);

	const [errorText, setErrorText] = useState("");

	const submitHandler = ({ name, email, password }) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((cred) => {
				const role = "user";

				setDoc(doc(db, "users", cred.user.uid), {
					email: email,
					userName: name,
					userRole: role,
				});

				setRegisterState(true);
			})
			.catch((err) => {
				console.error(err.message);
				setRegisterState(false);
				setErrorText(err.message);
			});
	};

	return (
		<>
			<FormContainer
				sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2, pb: 2 }}
				onSubmit={handleSubmit(submitHandler)}
				submitErrorText={errorText}
				formSubmitState={registerState}
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
				<SectionEndButton type="submit">Zarejestruj się</SectionEndButton>
			</FormContainer>
		</>
	);
};

export default RegisterTab;

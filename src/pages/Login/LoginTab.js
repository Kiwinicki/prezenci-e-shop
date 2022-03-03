import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { auth } from "../../firebase-config";

// components
import SectionEndButton from "../../components/SectionEndButton";
import FormContainer from "../../components/FormContainer";

const LoginTab = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [loginState, setLoginState] = useState(null);
	const [errorText, setErrorText] = useState("");

	const isAdmin = useSelector((state) => state.auth.isAdmin);

	const navigate = useNavigate();

	useEffect(() => {
		// after sign in as admin redirect to /admin route
		isAdmin && navigate("/admin");
	});

	const submitHandler = ({ email, password }) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((cred) => {
				setLoginState(true);
			})
			.catch((err) => {
				console.error(err.message);
				setErrorText(err.message);
				setLoginState(false);
			});
	};

	return (
		<>
			<FormContainer
				sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2, pb: 2 }}
				onSubmit={handleSubmit(submitHandler)}
				submitErrorText={errorText}
				formSubmitState={loginState}
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
				<SectionEndButton type="submit">Zaloguj się</SectionEndButton>
			</FormContainer>
		</>
	);
};

export default LoginTab;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc } from "@firebase/firestore";

import { catRef } from "../../firebase-config";

// my components
import FormContainer from "../../components/FormContainer";
import InputComponent from "../../components/InputComponent";

const AddCategoryForm = () => {
	const [uploadSuccess, setUploadSuccess] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = ({ name, key, path }) => {
		const catObject = {
			name,
			key,
			path,
		};

		// console.log(catObject);

		try {
			addDoc(catRef, catObject).then(() => {
				setUploadSuccess(true);

				reset();
				// after 7.5s success alert should disappear
				setTimeout(() => {
					setUploadSuccess(null);
				}, 7500);
			});
		} catch (err) {
			setUploadSuccess(false);
			console.error(err);
		}
	};

	const commonInputsProps = {
		registerFn: register,
		errorsObj: errors,
		required: true,
	};

	return (
		<FormContainer
			submitHandler={handleSubmit(onSubmit)}
			formTitle="Dodaj kategorię"
			submitBtnText="Dodaj kategorię"
			submitErrorText="Wystąpił błąd z dodaniem kategorii do bazy"
			submitSuccessText="Pomyślnie dodano kategorię do bazy"
			formSubmitState={uploadSuccess}
		>
			<InputComponent
				name="name"
				{...commonInputsProps}
				label="nazwa kategorii:"
				alertText="Nazwa kategorii jest wymagana"
				defaultValue={""}
			/>
			<InputComponent
				name="key"
				{...commonInputsProps}
				label="Klucz kategorii:"
				placeholder="CATEGORY_KEY"
				alertText="Klucz kategorii jest wymagany"
				inputProps={{ pattern: "[A-Z_]{1,}" }}
				defaultValue={""}
			/>
			<InputComponent
				name="path"
				{...commonInputsProps}
				label="Ścieżka kategorii:"
				placeholder="/category_path"
				alertText="ścieżka kategorii jest wymagana"
				inputProps={{ pattern: "/[a-z_?]{1,}" }}
				defaultValue={""}
			/>
		</FormContainer>
	);
};

export default AddCategoryForm;

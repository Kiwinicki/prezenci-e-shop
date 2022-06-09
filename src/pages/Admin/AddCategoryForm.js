import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc } from "@firebase/firestore";
import { Box } from "@mui/material";

import { catRef } from "../../firebase-config";

// my components
import FormContainer from "../../components/FormContainer";
import InputComponent from "../../components/InputComponent";
import SectionWrapper from "../../components/SectionWrapper";
import SectionEndButton from "../../components/SectionEndButton";
import SectionHeading from "../../components/SectionHeading";

// util functions
import slugifyString from "../../utils/slugifyString";

const AddCategoryForm = () => {
	const [uploadSuccess, setUploadSuccess] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = ({ name, key }) => {
		const catObject = {
			name,
			key,
			slug: slugifyString(name),
		};

		try {
			addDoc(catRef, catObject).then(() => {
				setUploadSuccess(true);
				reset();
				setTimeout(() => setUploadSuccess(null), 7500);
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
		defaultValue: "",
	};

	return (
		<SectionWrapper>
			<SectionHeading>Dodaj kategorię</SectionHeading>
			<FormContainer
				onSubmit={handleSubmit(onSubmit)}
				submitErrorText="Wystąpił błąd z dodaniem kategorii do bazy"
				submitSuccessText="Pomyślnie dodano kategorię do bazy"
				formSubmitState={uploadSuccess}
			>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2, pb: 2 }}>
					<InputComponent
						name="name"
						{...commonInputsProps}
						label="nazwa kategorii:"
						alertText="Nazwa kategorii jest wymagana"
					/>
					<InputComponent
						name="key"
						{...commonInputsProps}
						label="Klucz kategorii:"
						placeholder="CATEGORY_KEY"
						alertText={`Klucz kategorii jest wymagany. Musi składać się wyłącznie z wielkich liter lub znaku "_".`}
						inputProps={{ pattern: "[A-Z_]{1,}" }}
					/>
				</Box>
				<SectionEndButton type="submit">Dodaj kategorię</SectionEndButton>
			</FormContainer>
		</SectionWrapper>
	);
};

export default AddCategoryForm;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { prodRef, storage } from "../../firebase-config";

// custom components
import FormContainer from "../../components/FormContainer";
import InputComponent from "../../components/InputComponent";
import UploadButton from "../../components/UploadButton";
import SelectComponent from "../../components/SelectComponent";
import SectionEndButton from "../../components/SectionEndButton";
import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import generateSearchKeywords from "../../utils/generateSearchKeywords";

const AddProductForm = () => {
	const [uploadSuccess, setUploadSuccess] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = ({ category, name, images, price, keywords }) => {
		// array with pathes to uploaded images
		let imgURLs = [];

		const promiseArr = Array.from(images).map((img) => {
			const imageRef = ref(storage, img.name);

			const uploadTask = uploadBytes(imageRef, img);
			return uploadTask;
		});

		const additionalKeywordsArr = keywords
			.toLowerCase()
			.split(" ")
			.map((word) => generateSearchKeywords(word))
			.flat();

		// uniqe keywords from keywords field and product name
		const keywordsArr = [...new Set([...additionalKeywordsArr, ...generateSearchKeywords(name)])];

		async function addProductToFirebase() {
			// getting images paths
			for await (const uploadTask of promiseArr) {
				const url = await getDownloadURL(uploadTask.ref).catch((err) => {
					setUploadSuccess(false);
					console.log(err);
				});

				imgURLs.push(url);
			}

			// variables names same as object keys
			const prodObject = {
				category,
				imgURLs,
				name,
				keywords: keywordsArr,
				price: parseFloat(price),
				timestamp: new Date(),
			};

			// adding record(document) to database
			try {
				addDoc(prodRef, prodObject).then(() => {
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
		}

		addProductToFirebase();
	};

	// getting categories list from redux
	const categoriesList = useSelector((state) => state.categories.value);

	const sharedInputProps = {
		registerFn: register,
		errorsObj: errors,
	};

	return (
		<SectionWrapper>
			<SectionHeading>Dodaj produkt</SectionHeading>
			<FormContainer
				onSubmit={handleSubmit(onSubmit)}
				submitErrorText="Wystąpił błąd z dodaniem produktu do bazy"
				submitSuccessText="Pomyślnie dodano produkt do bazy"
				formSubmitState={uploadSuccess}
			>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2, pb: 2 }}>
					<InputComponent
						name="name"
						{...sharedInputProps}
						required={true}
						label="nazwa produktu:"
						alertText="Nazwa produktu jest wymagana"
						defaultValue={""}
					/>
					<InputComponent
						name="price"
						{...sharedInputProps}
						required={true}
						type="number"
						label="cena produktu:"
						alertText="Cena produktu jest wymagana"
						inputProps={{ min: 0.01, max: 999999.99, step: 0.01 }}
						defaultValue={""}
					/>
					<SelectComponent
						name="category"
						{...sharedInputProps}
						required={true}
						label="kategoria produktu:"
						alertText="Podanie kategorii produktu jest wymagane"
						optionsArr={categoriesList}
						defaultValue={""}
					/>
					<InputComponent
						name="keywords"
						{...sharedInputProps}
						label="słowa kluczowe oddzielone spacją"
						defaultValue={""}
					/>
					<UploadButton
						name="images"
						{...sharedInputProps}
						required={true}
						buttonText="Dodaj zdjęcia produktu"
						acceptFileTypes="image/*"
						alertText="Zdjęcie produktu jest wymagane(min. 1)"
						multiple
					/>
				</Box>
				{/* TODO: wyświetlanie nazw plików które zostały załadowane */}
				<SectionEndButton type="submit">Dodaj produkt</SectionEndButton>
			</FormContainer>
		</SectionWrapper>
	);
};

export default AddProductForm;

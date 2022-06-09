import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useSelector } from "react-redux";
import { Box, FormControl, InputLabel, Input, Typography } from "@mui/material";

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
		watch,
	} = useForm();

	const onSubmit = ({ category, name, images, price, keywords, description }) => {
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

			// some variables names same as object keys
			const prodObject = {
				category,
				imgURLs,
				name,
				description: description || "",
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
		defaultValue: "",
	};

	const watchImages = watch("images");

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
					/>
					<InputComponent
						name="price"
						{...sharedInputProps}
						required={true}
						type="number"
						label="cena produktu:"
						alertText="Cena produktu jest wymagana"
						inputProps={{ min: 0.01, max: 999999.99, step: 0.01 }}
					/>
					<SelectComponent
						name="category"
						{...sharedInputProps}
						required={true}
						label="kategoria produktu:"
						alertText="Podanie kategorii produktu jest wymagane"
						optionsArr={categoriesList}
					/>
					<InputComponent
						name="keywords"
						{...sharedInputProps}
						label="słowa kluczowe oddzielone spacją"
					/>
					<FormControl variant="standard">
						<InputLabel htmlFor="description-textarea">opis produktu</InputLabel>
						<Input
							id="description-textarea"
							inputComponent="textarea"
							defaultValue=""
							{...register("description")}
							sx={{
								"& > *": { resize: "vertical", minHeight: "7ch", bgcolor: "rgba(0,0,0,0.03)" },
							}}
						/>
					</FormControl>
					<UploadButton
						name="images"
						{...sharedInputProps}
						required={true}
						buttonText="Dodaj zdjęcia produktu"
						acceptFileTypes="image/*"
						alertText="Zdjęcie produktu jest wymagane(min. 1)"
						multiple
					/>
					<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
						{watchImages &&
							Array.from(watchImages).map((img) => (
								<Typography
									sx={{
										bgcolor: "background.default",
										border: "1px solid",
										borderColor: "primary.main",
										borderRadius: 2,
										p: 1,
									}}
								>
									{img.name}
								</Typography>
							))}
					</Box>
				</Box>
				<SectionEndButton type="submit">Dodaj produkt</SectionEndButton>
			</FormContainer>
		</SectionWrapper>
	);
};

export default AddProductForm;

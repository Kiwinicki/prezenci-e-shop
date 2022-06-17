import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import { prodRef, storage } from "../../firebase-config";

// custom components
import FormContainer from "../../components/FormContainer";
import InputComponent from "../../components/InputComponent";
import UploadButton from "../../components/UploadButton";
import { Textarea } from "../../components/Textarea";
import SelectComponent from "../../components/SelectComponent";
import SectionEndButton from "../../components/SectionEndButton";
import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import generateSearchKeywords from "../../utils/generateSearchKeywords";

const AddProductForm = () => {
	const [uploadSuccess, setUploadSuccess] = useState(null);

	const {
		handleSubmit,
		reset,
		watch,
		control,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			price: "",
			category: "",
			keywords: "",
			description: "",
			images: null,
		},
	});
	const watchImages = watch("images");

	const onSubmit = ({ category, name, images, price, keywords, description }) => {
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

		// unique keywords from keywords field and product name
		const keywordsArr = [...new Set([...additionalKeywordsArr, ...generateSearchKeywords(name)])];

		async function addProductToFirebase() {
			for await (const uploadTask of promiseArr) {
				getDownloadURL(uploadTask.ref)
					.then((url) => imgURLs.push(url))
					.catch((err) => {
						setUploadSuccess(false);
						console.error(err);
					});
			}

			const prodObject = {
				category,
				imgURLs,
				name,
				description: description || "",
				keywords: keywordsArr,
				price: parseFloat(price),
				timestamp: new Date(),
			};

			try {
				console.log(prodObject);
				addDoc(prodRef, prodObject).then(() => {
					setUploadSuccess(true);

					reset();
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

	const categoriesList = useSelector((state) => state.categories.value);

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
						control={control}
						requiredAlert="Nazwa produktu jest wymagana"
						label="nazwa produktu:"
					/>
					<InputComponent
						name="price"
						control={control}
						requiredAlert="Cena produktu jest wymagana"
						label="cena produktu:"
						inputProps={{ type: "number", min: 0.01, max: 999999.99, step: 0.01 }}
					/>
					<SelectComponent
						name="category"
						control={control}
						requiredAlert="Podanie kategorii produktu jest wymagane"
						label="kategoria produktu:"
						optionsArr={categoriesList}
					/>
					<InputComponent
						name="keywords"
						control={control}
						label="słowa kluczowe oddzielone spacją"
					/>
					<Textarea name="description" control={control} />
					<UploadButton
						name="images"
						registerFn={register}
						errors={errors.images}
						requiredAlert="Zdjęcie produktu jest wymagane(min. 1)"
						buttonText="Dodaj zdjęcia produktu"
						acceptFileTypes="image/*"
						multiple
					/>
					<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
						{watchImages &&
							Array.from(watchImages).map((img, i) => (
								<Typography
									sx={{
										bgcolor: "background.default",
										border: "1px solid",
										borderColor: "primary.main",
										borderRadius: 2,
										p: 1,
									}}
									key={i}
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

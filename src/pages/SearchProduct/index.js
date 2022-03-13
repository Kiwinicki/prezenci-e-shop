import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, Typography, Box, Grid } from "@mui/material";

// custom components
import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import SelectComponent from "../../components/SelectComponent";
import InputComponent from "../../components/InputComponent";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

// form submition logic
import searchProductsHandler from "./searchProductsHandler";

// custom hooks
import {
	useLoadingStateMachine,
	states as loadingStates,
} from "../../hooks/useLoadingStateMachine";
import slugifyString from "../../utils/slugifyString";

const textStyles = { textAlign: "center", p: 2, color: "grey.600" };

const SearchProductPage = ({ categoryObj }) => {
	const [resp, setResp] = useState([]);
	const [compareState, updateLoadingState] = useLoadingStateMachine();

	const categoriesArr = useSelector((state) => state.categories.value);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	const defaultSelectVal = categoryObj ? categoryObj.key : "";

	useEffect(() => {
		categoryObj &&
			searchProductsHandler({ category: defaultSelectVal, setResp, updateLoadingState });
	}, []);

	return (
		<Grid container flexDirection={"column"} sx={{ minHeight: "100%", alignItems: "stretch" }}>
			<Grid item>
				<SectionWrapper>
					<SectionHeading>Szukaj produktów</SectionHeading>
					<Box
						component="form"
						autoComplete="off"
						onSubmit={handleSubmit(({ searchWord, category }) => {
							// FIXME: kurwaa rzuca błędem
							// setValue({ name: "category", value: category });
							// clear();
							searchProductsHandler({ searchWord, category, setResp, updateLoadingState });
						})}
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "space-around",
							flexWrap: "wrap",
							gap: "20px",
							p: "20px",
						}}
					>
						<SelectComponent
							name="category"
							registerFn={register}
							errorsObj={errors}
							label="kategoria produktu:"
							alertText=""
							optionsArr={categoriesArr}
							defaultValue={defaultSelectVal}
							sx={{ minWidth: { xs: "100%", sm: "200px" } }}
						/>
						<InputComponent
							name="searchWord"
							registerFn={register}
							errorsObj={errors}
							label="zacznij szukać"
							alertText=""
							defaultValue={""}
							sx={{ flexGrow: 2, minWidth: { xs: "100%", sm: "100px" } }}
						/>
						<Button type="submit" variant="contained">
							Szukaj
						</Button>
					</Box>
				</SectionWrapper>
			</Grid>
			{/* TODO: pagination with RTK query? */}
			<Grid item sx={{ display: "flex", flexGrow: 2, minHeight: "30vh", height: "100%" }}>
				<SectionWrapper
					sx={{
						flex: "1 1 auto",
					}}
				>
					{compareState(loadingStates.isLoading) && <Loader />}
					{compareState(loadingStates.hasLoaded) && resp.length > 0 && (
						<Box>
							<Box
								sx={{
									display: "grid",
									gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
									gap: 2,
									px: 2,
									pb: 2,
								}}
							>
								{resp.map((prod, i) => (
									<ProductCard
										img={prod.imgURLs[0]}
										price={prod.price}
										name={prod.name}
										// FIXME: zmienić na prod.category(path) + prod name(slug)
										path={`/${prod.category}/${slugifyString(prod.name)}`}
										key={i}
									/>
								))}
							</Box>
						</Box>
					)}
					{compareState(loadingStates.hasLoaded) && resp.length === 0 && (
						<Typography sx={textStyles}>
							Brak wyników. Spróbuj użyć innych słów kluczowych lub usuń pewne parametry
							wyszukiwania.
						</Typography>
					)}
					{compareState(loadingStates.hasError) && (
						<Typography sx={textStyles}>
							Wystąpił błąd podczas pobierania wyników wyszukiwania. Sprawdź połączenie z
							internetem.
						</Typography>
					)}
					{compareState(loadingStates.empty) && (
						<Typography sx={textStyles}>
							Wpisz szukaną frazę lub kategorię by wyświetlić wyniki.
						</Typography>
					)}
				</SectionWrapper>
			</Grid>
		</Grid>
	);
};

export default SearchProductPage;

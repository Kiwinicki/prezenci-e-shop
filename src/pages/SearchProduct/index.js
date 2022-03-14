import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Typography, Box, Grid } from "@mui/material";

// custom components
import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import SelectComponent from "../../components/SelectComponent";
import InputComponent from "../../components/InputComponent";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

// utility functions
import slugifyString from "../../utils/slugifyString";

// form submition logic
import searchProductsHandler from "./searchProductsHandler";

// custom hooks
import {
	useLoadingStateMachine,
	states as loadingStates,
} from "../../hooks/useLoadingStateMachine";

const textStyles = { textAlign: "center", p: 2, color: "grey.600" };

const SearchProductPage = () => {
	const urlParams = useParams();
	const navigate = useNavigate();

	const [resp, setResp] = useState([]);
	const [compareState, updateLoadingState] = useLoadingStateMachine();

	const categoriesArr = useSelector((state) => state.categories.value);

	const categoryKey = urlParams.categorySlug
		? categoriesArr.find((el) => el.slug === urlParams.categorySlug).key
		: "";

	// if user comes from some category link set Select default value on url param on first render
	const defaultSelectValue = useRef(categoryKey);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		urlParams.categorySlug &&
			searchProductsHandler({
				category: categoryKey,
				setResp,
				updateLoadingState,
			});
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
							searchProductsHandler({ searchWord, category, setResp, updateLoadingState });
							navigate(
								`/szukaj/${slugifyString(categoriesArr.find((el) => el.key === category).name)}`
							);
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
							defaultValue={defaultSelectValue.current}
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
								{resp.map((prod) => {
									const categoryName =
										categoriesArr.length !== 0 &&
										categoriesArr.find((el) => el.key === prod.category).name;

									return (
										<ProductCard
											img={prod.imgURLs[0]}
											price={prod.price}
											name={prod.name}
											path={`/szukaj/${slugifyString(categoryName)}/${prod.id}`}
											key={prod.id}
										/>
									);
								})}
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

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Loader from "../../components/Loader";

import SectionEndButton from "../../components/SectionEndButton";

const CategoriesList = () => {
	const categoriesArr = useSelector((state) => state.categories.value);

	const theme = useTheme();
	const isBiggerThanLg = useMediaQuery(theme.breakpoints.up("lg"));

	const categoriesAmount = isBiggerThanLg ? 8 : 6;

	return (
		<>
			{categoriesArr.length > 0 ? (
				<>
					<Box
						sx={{
							display: "grid",
							gridTemplateRows: { xs: "repeat(3, 1fr)", sm: "repeat(2, 1fr)" },
							gridTemplateColumns: {
								xs: "repeat(2, 1fr)",
								sm: "repeat(3, 1fr)",
								lg: "repeat(4, 1fr)",
							},
							gap: 2,
							px: 2,
						}}
					>
						{categoriesArr.slice(0, categoriesAmount).map(({ path, name, key }) => (
							<Button
								component={RouterLink}
								to={path}
								sx={{
									borderRadius: "12px",
									py: "2vw",
									"&:link, &:visited": {
										color: "grey.900",
									},
									"&:hover, &:active": {
										bgcolor: "grey.200",
									},
									textDecoration: "none",
									bgcolor: "grey.100",
									textAlign: "center",
									fontWeight: "bold",
									textTransform: "none",
								}}
								key={key}
							>
								<Typography variant="h6" sx={{ fontWeight: "bold" }}>
									{name}
								</Typography>
							</Button>
						))}
					</Box>
					{categoriesArr.length > categoriesAmount && (
						<SectionEndButton component={RouterLink} to="/szukaj">
							Szukaj produktów
						</SectionEndButton>
					)}
				</>
			) : (
				<Loader />
			)}
		</>
	);
};

export default CategoriesList;

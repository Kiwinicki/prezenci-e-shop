import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Grid,
	Typography,
	Button,
	Card,
	CardMedia,
	CardContent,
	Paper,
	List,
	ListItem,
	Link,
} from "@mui/material";

// components
import Carousel from "../../components/Carousel";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import HeroSection from "./HeroSection";
import NewProducts from "./NewProducts";
import CategoriesList from "./CategoriesList";
import UpcomingHolidayProducts from "./UpcomingHolidayProducts";
import Logo from "../../assets/logo.svg";

const HomePage = () => {
	return (
		<Grid container sx={{ gap: 2, marginBottom: 2 }}>
			<HeroSection />

			{/* Recently added products */}
			<GridItem>
				<SectionHeading>Nowości</SectionHeading>
				<NewProducts />
			</GridItem>

			{/* Categories list */}
			<GridItem>
				<SectionHeading>Kategorie</SectionHeading>
				<CategoriesList />
			</GridItem>

			{/* Promotional occasions */}
			<GridItem>
				<SectionHeading>Na zbliżające się święta</SectionHeading>
				<UpcomingHolidayProducts />
			</GridItem>
		</Grid>
	);
};

export default HomePage;

const SectionHeading = ({ children, sx }) => (
	<Typography component="h2" variant="h5" fontWeight="bold" textAlign="center" sx={sx}>
		{children}
	</Typography>
);

const GridItem = ({ children, sx }) => (
	<Grid
		item
		xs={12}
		sx={{
			display: "flex",
			flexDirection: "column",
			gap: 2,
			textAlign: "center",
			paddingTop: 1,
			...sx,
		}}
		component={Paper}
		elevation={0}
	>
		{children}
	</Grid>
);

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
	Box,
	Container,
} from "@mui/material";

// components
import HeroSection from "./HeroSection";
import NewProductsList from "./NewProductsList";
import CategoriesList from "./CategoriesList";
import UpcomingHolidayProducts from "./UpcomingHolidayProducts";
import SectionHeading from "../../components/SectionHeading";
import SectionWrapper from "../../components/SectionWrapper";
import AboutSection from "./AboutSection";

const HomePage = () => {
	return (
		<Grid
			container
			sx={{
				gap: 2,
				maxWidth: "lg",
				margin: "0 auto",
				"& *": { flexGrow: 1 },
			}}
		>
			<HeroSection />

			{/* Recently added products */}
			<GridItem>
				<SectionWrapper>
					<SectionHeading>Nowości</SectionHeading>
					<NewProductsList />
				</SectionWrapper>
			</GridItem>

			{/* Categories list */}
			<GridItem>
				<SectionWrapper>
					<SectionHeading>Kategorie</SectionHeading>
					<CategoriesList />
				</SectionWrapper>
			</GridItem>

			{/* Upcoming holidays */}
			<GridItem>
				<SectionWrapper>
					<SectionHeading>Na zbliżające się święta</SectionHeading>
					<UpcomingHolidayProducts />
				</SectionWrapper>
			</GridItem>

			{/* About us */}
			<GridItem>
				<SectionWrapper>
					<SectionHeading>O nas</SectionHeading>
					<AboutSection />
				</SectionWrapper>
			</GridItem>
		</Grid>
	);
};

export default HomePage;

const GridItem = ({ children, sx }) => (
	<Grid
		item
		xs={12}
		sx={{
			display: "flex",
			flexDirection: "column",
			gap: 2,
			...sx,
		}}
	>
		{children}
	</Grid>
);

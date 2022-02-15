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
import Logo from "../../components/Logo";

// FIXME: ogólnie cały układ jest rozjebany;
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
					{/* FIXME: dodać paddingi po bokach tekstu */}
					<Typography sx={{ px: 2, textAlign: "justify" }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur quae enim nisi
						voluptatem veniam ex nemo delectus cum facilis, vero autem ut? Porro eaque ipsum saepe
						harum minima quaerat id velit magni hic delectus ipsa debitis veritatis neque in enim
						non incidunt voluptate ea corporis repellendus, doloribus dicta, rem impedit numquam?
						Nesciunt exercitationem culpa magni nemo? Dolores atque mollitia voluptate ipsum
						exercitationem autem ullam! Voluptatibus neque provident magnam impedit tempore numquam
						aliquam officia consequatur nobis? Sed, accusantium? Vero pariatur omnis fuga
						voluptatem, numquam exercitationem nemo! Dolorum natus a voluptas perspiciatis similique
						optio ipsum minima iste cupiditate eveniet asperiores nemo incidunt excepturi ea
						tempore, inventore voluptatum aut suscipit. Totam qui quisquam, in molestiae doloribus
						accusantium impedit.
						{/* miejsce na jakieś zdjęcie */}
						Placeat voluptate aliquam eum perferendis voluptas qui fuga exercitationem quae iste
						facere enim expedita ab soluta, molestiae dolorem, recusandae cupiditate dolorum fugiat
						dolore! Sed voluptate voluptas sunt. Sit natus, in maxime neque aperiam ab
						necessitatibus nobis fugiat reiciendis assumenda dignissimos earum magni aliquid amet
						illum itaque aliquam. Perferendis dolorem ipsa non qui, soluta voluptatibus eius ad
						distinctio corrupti possimus debitis eaque incidunt ex quaerat consectetur praesentium,
						eum illo neque accusamus doloribus quae, nisi molestias expedita voluptates. Libero
						aliquid itaque in explicabo doloremque, quibusdam molestiae? Consectetur voluptate
						labore praesentium ex blanditiis itaque atque temporibus. Ea nostrum voluptate
						necessitatibus quod cum deleniti repudiandae, obcaecati similique, debitis a quia?
						Tempora recusandae quos quo? Inventore non ut sint, voluptatibus dicta doloribus rem ab
						eos perspiciatis. Sunt, aliquid eum possimus quaerat dolor nemo ducimus voluptatem iste,
						neque cum animi autem?
					</Typography>
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

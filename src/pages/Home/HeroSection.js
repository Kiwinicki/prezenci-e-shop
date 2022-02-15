import { styled, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import HeroImage from "../../assets/hero.webp";

import SectionWrapper from "../../components/SectionWrapper";

const HeroHeading = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.contrastText,
	fontWeight: "bold",
}));

const HeroSection = () => {
	return (
		<SectionWrapper
			sx={{
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(${HeroImage})`,
				backgroundSize: "cover",
				padding: {
					xs: "30px 20px",
					sm: "75px 0",
					lg: "100px 0",
				},
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: { xs: "30px", lg: "50px" },
			}}
		>
			<HeroHeading component="h2" variant="h3">
				Prezenty na każdą okazję!
			</HeroHeading>
			{/* TODO: scroll down or move to another page */}
			<Button
				component={RouterLink}
				to="/kategorie"
				variant="contained"
				sx={{ width: "fit-content", p: { md: "10px 30px" } }}
			>
				Sprawdź!
			</Button>
		</SectionWrapper>
	);
};

export default HeroSection;

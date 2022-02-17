import { Box, Typography } from "@mui/material";

const AboutSection = () => {
	return (
		<Box
			sx={{
				px: 2,
				paddingBottom: 2,
				textAlign: "center",
				position: "relative",
				zIndex: "0",

				"& h5": {
					fontWeight: "bold",
					textAlign: "center",
					marginTop: 4,
				},

				":before": {
					content: `"Prezencik.pl"`,
					position: "absolute",
					fontSize: { xs: "130px", sm: "100px", md: "180px" },
					fontWeight: "900",
					letterSpacing: "3px",
					transform: {
						xs: "rotate(90deg) translate(30%, 160%)",
						md: "rotate(10deg) translate(-50%, -30%)",
					},
					left: { xs: "0", md: "50%" },
					top: { xs: "0", md: "50%" },
					color: "grey.100",
					zIndex: "-1",
				},
			}}
		>
			<Typography variant="h5">Gadżety dla każdego</Typography>
			<Typography>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sunt unde atque amet
				aliquid! Placeat eum a nulla aliquam optio. Lorem ipsum dolor sit amet consectetur,
				adipisicing elit. Cumque tempore culpa non iusto numquam, excepturi laudantium officiis at
				nisi eligendi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, aut.
			</Typography>
			<Typography variant="h5">Upominek dla niej i dla niego</Typography>
			<Typography>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sunt unde atque amet
				aliquid! Placeat eum a nulla aliquam optio. Lorem ipsum dolor sit amet consectetur,
				adipisicing elit. Cumque tempore culpa non iusto numquam, excepturi laudantium officiis at
				nisi eligendi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, aut.
			</Typography>
			<Typography variant="h5">Prezenty dla dorosłych i dzieci</Typography>
			<Typography>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sunt unde atque amet
				aliquid! Placeat eum a nulla aliquam optio. Lorem ipsum dolor sit amet consectetur,
				adipisicing elit. Cumque tempore culpa non iusto numquam, excepturi laudantium officiis at
				nisi eligendi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, aut.
			</Typography>
		</Box>
	);
};

export default AboutSection;

import { Card, CardMedia, CardContent } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CarouselItem = ({ children, img, imgAlt = "", path = "" }) => {
	return (
		<Card
			component={RouterLink}
			to={path}
			elevation={0}
			sx={{
				padding: "0 5px",
				textDecoration: "none",
			}}
		>
			<CardMedia
				component="img"
				src={img}
				alt={imgAlt}
				sx={{
					objectFit: "contain",
					width: "100%",
					minHeight: "160px",
					height: "20vw",
					maxHeight: "300px",
					borderRadius: 2,
				}}
			/>
			<CardContent
				sx={{
					typography: {
						xs: "body2",
					},
					"&&": {
						padding: "5px 0",
					},
				}}
			>
				{children}
			</CardContent>
		</Card>
	);
};

export default CarouselItem;

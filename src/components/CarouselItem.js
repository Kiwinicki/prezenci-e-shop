import { Card, CardMedia, CardContent } from "@mui/material";

const CarouselItem = ({ children, img, imgAlt = "" }) => {
	return (
		<Card
			elevation={0}
			sx={{
				padding: "0 5px",
			}}
		>
			<CardMedia
				component="img"
				src={img}
				alt={imgAlt}
				sx={{
					objectFit: "contain",
					width: " 100%",
					minHeight: "160px",
					height: "20vw",
					maxHeight: "300px",
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

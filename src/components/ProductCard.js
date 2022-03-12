import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ price, name, img, imgAlt = "", path }) => {
	return (
		<>
			<Card
				elevation={0}
				component={RouterLink}
				to={path || ""}
				sx={{
					transition: "0.25s",
					"&:hover": {
						bgcolor: "grey.200",
						borderColor: "grey.200",
					},
					textDecoration: "none",
					bgcolor: "grey.100",
					borderRadius: "12px",
					border: "4px solid",
					borderColor: "grey.100",
				}}
			>
				<CardMedia
					component="img"
					src={img}
					alt={imgAlt}
					sx={{
						objectFit: "contain",
						height: "clamp(160px, 20vw, 300px)",
						paddingTop: "10px",
						bgcolor: "white",
					}}
				/>
				<CardContent
					sx={{
						textAlign: "center",
					}}
				>
					<Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.dark" }}>
						{price}
					</Typography>
					<Typography
						sx={{
							display: "-webkit-box",
							WebkitLineClamp: "2",
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							fontWeight: "bold",
						}}
					>
						{name}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default ProductCard;

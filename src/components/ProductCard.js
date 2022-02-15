import { Card, CardMedia, CardContent, Divider, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ children, img, imgAlt = "", path }) => {
	return (
		<>
			<Card
				// square
				elevation={0}
				component={RouterLink}
				to={path || ""}
				sx={{
					// borderBottom: { xs: "12px solid" },
					// borderBottomColor: "red",
					// minWidth: "140px",
					// TODO: wersja desktopowa
					// width: "100%",
					// maxWidth: "320px",
					// p: "0 5px 5px",
					// mx: "10px",
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
					{children}
				</CardContent>
			</Card>
			{/* <Divider /> */}
		</>
	);
};

export default ProductCard;

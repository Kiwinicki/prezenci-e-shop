import { Card, CardMedia, CardContent } from "@mui/material";

const ProductCard = ({ children, img, imgAlt = "" }) => {
	return (
		<Card elevation={0} square sx={{ border: "1px solid red" }}>
			<CardMedia component="img" src={img} alt={imgAlt} />
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default ProductCard;

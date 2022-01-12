import { Card, CardMedia, CardContent } from '@mui/material';

const ProductCard = ({ children, img, imgAlt = '' }) => {
	return (
		<Card variant="outlined">
			<CardMedia component="img" src={img} alt={imgAlt} sx={{}} />
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default ProductCard;

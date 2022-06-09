import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SelectedProductsList = ({ cart }) => {
	return (
		<Box>
			<Typography variant="h5" component="h3" fontWeight="bold">
				Produkty i sposób dostawy
			</Typography>
			{Object.entries(cart).map(([id, prod]) => (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						bgcolor: "grey.100",
						boxShadow: "none",
						gap: 1,
						p: 1,
						transition: "0.25s",
						borderBottom: "1px solid",
						borderBottomColor: "grey.300",
						":first-of-type": {
							borderTop: "1px solid",
							borderTopColor: "grey.300",
							marginTop: 1,
						},
						"&:hover": {
							bgcolor: "grey.200",
							borderColor: "grey.200",
						},
					}}
					key={id}
				>
					{/* Product name */}
					<Link
						component={RouterLink}
						to={`/szukaj/${prod.categorySlug}/${id}`}
						sx={{
							color: "inherit",
							gridArea: "name",
							fontWeight: "500",
							transition: "0.1s",
							":hover": {
								color: "primary.dark",
							},
						}}
					>
						{prod.name}
					</Link>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: "4px",
						}}
					>
						{/* Product price and amount */}
						<Typography sx={{ fontSize: "1rem", lineHeight: "1", color: "grey.800" }}>
							{prod.price} zł * {prod.amount}
						</Typography>
						{/* Sum to be paid for this products */}
						<Typography
							sx={{
								fontSize: "1.2rem",
								lineHeight: "1",
								color: "primary.dark",
								fontWeight: "bolder",
							}}
						>
							{(prod.price * prod.amount).toFixed(2)} zł
						</Typography>
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default SelectedProductsList;

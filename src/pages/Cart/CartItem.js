import { Box, Link, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import ChangeAmountButtonGroup from "../../components/ChangeAmountButtonGroup";

import {
	increaseProductAmountInCart,
	decreaseProductAmountInCart,
	removeProductFromCart,
} from "../../features/Cart";

const CartItem = ({ id, prod }) => {
	const dispatch = useDispatch();

	return (
		<Box
			sx={{
				bgcolor: "grey.100",
				borderRadius: "12px",
				border: "5px solid",
				borderColor: "grey.100",
				boxShadow: "none",
				p: 1,
				display: "grid",
				justifyContent: "center",
				gridTemplateColumns: "auto 1fr auto",
				gridTemplateAreas: {
					xs: `"name name name" "amount-btns amount-btns amount-btns" "price price delete-btn"`,
					sm: `"name name name" "amount-btns price delete-btn"`,
				},
				gap: 2,
				transition: "0.25s",
				"&:hover": {
					bgcolor: "grey.200",
					borderColor: "grey.200",
					cursor: "pointer",
				},
			}}
		>
			{/* Product name */}
			<Link
				component={RouterLink}
				to={`/szukaj/${prod.categorySlug}/${id}`}
				sx={{
					color: "inherit",
					gridArea: "name",
					fontWeight: "500",
				}}
			>
				{prod.name}
			</Link>
			{/* Change amount buttons */}
			<ChangeAmountButtonGroup
				sx={{ gridArea: "amount-btns", alignSelf: "center" }}
				prod={prod}
				increaseClickHandler={() =>
					dispatch(
						increaseProductAmountInCart({
							[id]: { name: prod.name, price: prod.price },
						})
					)
				}
				decreaseClickHandler={() =>
					dispatch(
						decreaseProductAmountInCart({
							[id]: { name: prod.name, price: prod.price },
						})
					)
				}
			/>
			{/* Product price */}
			<Box
				sx={{
					gridArea: "price",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					color: "primary.dark",
					gap: "4px",
				}}
			>
				<Typography variant="h5" component="p" sx={{ fontWeight: "bold", lineHeight: "1.1" }}>
					{(prod.price * prod.amount).toFixed(2)} zł
				</Typography>
				<Typography variant="subtitle1" component="span" sx={{ lineHeight: "1.1" }}>
					{prod.price} zł za sztukę
				</Typography>
			</Box>
			{/* Delete product button */}
			<Button
				variant="contained"
				onClick={() => dispatch(removeProductFromCart(id))}
				sx={{ gridArea: "delete-btn" }}
			>
				<DeleteIcon />
			</Button>
		</Box>
	);
};

export default CartItem;

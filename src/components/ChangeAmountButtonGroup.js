import { Button, ButtonGroup, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ChangeAmountButtonGroup = ({ prod, increaseClickHandler, decreaseClickHandler, sx }) => {
	return (
		<ButtonGroup variant="contained" sx={{ width: "min-content", height: "min-content", ...sx }}>
			<Button
				onClick={increaseClickHandler}
				{...(prod.amount === 999 && { disabled: true })}
				sx={{ border: "none !important", width: "3rem" }}
			>
				<AddIcon />
			</Button>
			<Box
				sx={{
					width: "3.5rem",
					border: "3px solid",
					borderColor: "primary.main",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					lineHeight: "1",
					fontWeight: "bolder",
				}}
			>
				{prod.amount}
			</Box>
			<Button
				onClick={decreaseClickHandler}
				{...(prod.amount === 0 && { disabled: true })}
				sx={{
					border: "none !important",
					width: "3rem",
				}}
			>
				<RemoveIcon />
			</Button>
		</ButtonGroup>
	);
};

export default ChangeAmountButtonGroup;

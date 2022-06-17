import { Button } from "@mui/material";

const SectionEndButton = ({ children, sx, ...other }) => {
	return (
		<Button
			sx={{ width: "100%", borderRadius: 0, gridColumn: "1 / -1", ...sx }}
			variant="contained"
			{...other}
		>
			{children}
		</Button>
	);
};

export default SectionEndButton;

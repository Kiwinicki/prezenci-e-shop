import { Typography } from "@mui/material";

const SectionHeading = ({ children, sx }) => (
	<Typography
		component="h2"
		variant="h4"
		sx={{ color: "grey.900", textAlign: "center", fontWeight: "bold", ...sx }}
	>
		{children}
	</Typography>
);

export default SectionHeading;

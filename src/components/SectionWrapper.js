import { Paper } from "@mui/material";

const SectionWrapper = ({ children, sx }) => {
	return (
		<Paper
			sx={{
				borderRadius: { xs: "0", lg: "12px" },
				paddingTop: 2,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				overflow: "hidden",
				...sx,
			}}
			elevation={0}
		>
			{children}
		</Paper>
	);
};

export default SectionWrapper;

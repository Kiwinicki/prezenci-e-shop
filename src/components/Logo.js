import { Link, Typography, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LogoSVG from "../assets/logo.svg";

const Logo = () => {
	const matches = useMediaQuery("(min-width:381px)");
	return (
		<Link
			component={RouterLink}
			to="/"
			sx={{
				display: "flex",
				alignItems: "center",
				gap: "5px",
				transition: "0.15s filter ease-in-out",
				"&:hover": {
					filter: "brightness(115%)",
				},
			}}
		>
			<img src={LogoSVG} alt="logo Prezencik.pl" width={50} height={50} />
			{matches && (
				<Typography
					component="h1"
					sx={{
						color: "white",
						fontWeight: "bold",
						fontStyle: "italic",
						fontSize: { xs: "18px", sm: "26px" },
					}}
				>
					Prezencik.pl
				</Typography>
			)}
		</Link>
	);
};

export default Logo;

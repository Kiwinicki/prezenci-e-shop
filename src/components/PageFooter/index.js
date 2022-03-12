import { Grid, Box, Typography, Link, Divider } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Link as RouterLink } from "react-router-dom";

import Logo from "../../components/Logo";

const contactLinksStyles = {
	color: "primary.contrastText",
	cursor: "pointer",
	fontWeight: "bold",
	display: "flex",
	justifyContent: "center",
	gap: 1,
};

const PageFooter = () => {
	const actualYear = new Date().getFullYear().toString();

	return (
		<Box component="footer" sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
			<Grid
				container
				sx={{
					justifyContent: "center",
					rowGap: 3,
					columnGap: 4,
					textAlign: "center",
					px: 4,
					pt: 4,
					pb: 1,
				}}
			>
				<Grid item>
					<Logo />
				</Grid>
				<Grid
					item
					container
					xs={12}
					sm={12}
					md={"auto"}
					sx={{
						gap: 3,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Grid item>
						<StyledRouterLink to="/logowanie">Zaloguj/Zarejestruj się</StyledRouterLink>
					</Grid>
					<Grid item>
						<StyledRouterLink to="/szukaj">Produkty</StyledRouterLink>
					</Grid>
					<Grid item>
						<StyledRouterLink to="/polityka-prywatnosci">Polityka prywatności</StyledRouterLink>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<StyledDivider />
				</Grid>
				<Grid
					item
					container
					xs={12}
					sx={{
						columnGap: 4,
						rowGap: 2,
						justifyContent: "center",
						wrap: "wrap",
					}}
				>
					<Grid item xs={12} sm={"auto"}>
						<Link href="tel:+48123456789" sx={contactLinksStyles}>
							<CallIcon />
							<Typography sx={{ ":hover": { textDecoration: "underline" } }}>
								+48 123 456 789
							</Typography>
						</Link>
					</Grid>
					<Grid item xs={12} sm={"auto"}>
						<Link href="mailto:abc@xyz.pl" sx={contactLinksStyles}>
							<AlternateEmailIcon />
							<Typography sx={{ ":hover": { textDecoration: "underline" } }}>abc@xyz.pl</Typography>
						</Link>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<StyledDivider />
				</Grid>
				<Grid item xs={12}>
					<Typography>Wszystkie prawa zastrzeżone | &copy;{actualYear} | Prezencik.pl</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default PageFooter;

const StyledRouterLink = ({ to, children }) => (
	<Link component={RouterLink} to={to} color="inherit" underline="hover">
		{children}
	</Link>
);

const StyledDivider = () => (
	<Divider
		sx={{
			borderColor: "primary.contrastText",
			maxWidth: { xs: "100%", md: "750px" },
			margin: "0 auto",
		}}
	/>
);

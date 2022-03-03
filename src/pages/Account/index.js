import { Grid, Typography } from "@mui/material";

const AccountPage = () => {
	return (
		<Grid container sx={{ my: 2 }}>
			<Grid item xs={12}>
				<Typography variant="h2" sx={{ fontWeight: "medium", textAlign: "center" }}>
					Account Panel
				</Typography>
			</Grid>
		</Grid>
	);
};

export default AccountPage;

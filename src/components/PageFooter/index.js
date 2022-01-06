import { Grid, Box, Typography } from '@mui/material';

const PageFooter = () => {
	return (
		<Box component="footer" sx={{ bgcolor: 'primary.main' }}>
			<Grid container spacing={2} sx={{ color: 'primary.contrastText' }}>
				<Grid item xs="auto">
					<Typography>Prezencik.pl &copy;{new Date().getFullYear().toString()}</Typography>
				</Grid>
				<Grid item xs="auto">
					Zaloguj/Zarejestruj się
				</Grid>
			</Grid>
		</Box>
	);
};

export default PageFooter;

import { Grid, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PageFooter = () => {
	return (
		<Box component="footer" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
			<Grid container spacing={2} sx={{ justifyContent: 'center', textAlign: 'center', py: '16px' }}>
				<Grid item xs="12" sm="6" md="4">
					<Box marginBottom={2}>
						<Link component={RouterLink} to="/login" color="inherit" underline="hover">
							Zaloguj/Zarejestruj się
						</Link>
					</Box>
					<Box marginBottom={2}>
						<Link component={RouterLink} to="/kategorie" color="inherit" underline="hover">
							Kategorie
						</Link>
					</Box>
					<Box>
						<Link component={RouterLink} to="/polityka-prywatnosci" color="inherit" underline="hover">
							Polityka prywatności
						</Link>
					</Box>
				</Grid>
				<Grid item xs="12" sm="6" md="4" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Box>
						<Typography>Prezencik.pl &copy;{new Date().getFullYear().toString()}</Typography>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default PageFooter;

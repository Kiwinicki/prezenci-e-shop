import { styled, Box, Typography, Button } from '@mui/material';

import HeroImage from '../../assets/hero.webp';

// FIXME: fix for bigger screens
const HeroContainer = styled(Box)({
	backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(${HeroImage})`,
	backgroundSize: 'cover',
	width: '100%',
	padding: '30px 20px',
	textAlign: 'center',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '30px',
});

const HeroHeading = styled(Typography)(({ theme }) => ({ color: theme.palette.primary.contrastText, fontWeight: 'bold' }));

const HeroSection = () => {
	return (
		<HeroContainer>
			<HeroHeading component="h2" variant="h3">
				Prezenty na każdą okazję!
			</HeroHeading>
			{/* TODO: scroll down or move to another page */}
			<Button variant="contained" sx={{ width: 'fit-content' }}>
				Sprawdź!
			</Button>
		</HeroContainer>
	);
};

export default HeroSection;

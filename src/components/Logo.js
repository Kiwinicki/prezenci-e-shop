import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LogoSVG from '../assets/logo.svg';

const Logo = () => {
	return (
		<Link
			component={RouterLink}
			to="/"
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: '5px',
				transition: '0.15s filter ease-in-out',
				'&:hover': {
					filter: 'brightness(150%)',
				},
			}}
		>
			<img src={LogoSVG} alt="logo Prezencik.pl" width={50} height={50} />
			<Typography component="h1" variant="h5" sx={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>
				Prezencik.pl
			</Typography>
		</Link>
	);
};

export default Logo;

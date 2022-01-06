import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

import Logo from '../Logo';

const PageHeader = () => {
	return (
		// TODO: header chowa się przy scrollu w dół i pokazuje gdy do góry
		<AppBar>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Logo />
				<Box>
					<IconButton size="large" color="inherit" aria-label="konto">
						<PersonIcon />
					</IconButton>
					<IconButton size="large" color="inherit" aria-label="szukaj">
						<SearchIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default PageHeader;

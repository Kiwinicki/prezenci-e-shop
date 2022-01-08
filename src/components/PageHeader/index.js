import { AppBar, Toolbar, IconButton, Box, styled, useScrollTrigger, Slide } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import Logo from '../Logo';
import SearchBar from './SearchBar';

const HideOnScroll = ({ children }) => {
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};

const PageHeader = () => {
	const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

	return (
		<>
			<HideOnScroll>
				<AppBar>
					<Toolbar sx={{ gap: '10px' }}>
						<Logo />
						<Box flexGrow={1} />
						<SearchBar />
						{/* TODO: dodać mechanikę szukania przez search bar */}
						<IconButton size="large" color="inherit" aria-label="konto">
							<PersonIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Offset />
		</>
	);
};

export default PageHeader;

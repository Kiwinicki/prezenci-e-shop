import { Box, List, ListItem, Paper, Link, useMediaQuery } from '@mui/material';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const AccountPopup = forwardRef((props, ref) => {
	const zalogowany = true; // TODO: dodać stan zalogowania do redux

	// FIXME: zmienić na mixin.toolbar jeśli się da
	const matchesSM = useMediaQuery((theme) => theme.breakpoints.up('sm'));

	return (
		<Paper ref={ref} sx={{ backgroundColor: 'white', position: 'absolute', borderRadius: 1.5, top: matchesSM ? '74px' : '68px', right: '10px' }}>
			{zalogowany ? (
				<List>
					<ListItem button divider>
						<Link component={RouterLink} to="/konto">
							Konto
						</Link>
					</ListItem>
					<ListItem button divider>
						<Link component={RouterLink} to="/konto/koszyk">
							Koszyk
						</Link>
					</ListItem>
					<ListItem button divider>
						<Link component={RouterLink} to="/konto/powiadomienia">
							Powiadomienia
						</Link>
					</ListItem>
					{/* TODO: dokończyć */}
				</List>
			) : (
				'zaloguj się'
			)}
		</Paper>
	);
});

export default AccountPopup;

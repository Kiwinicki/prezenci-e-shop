import { useState } from 'react';
import { Typography, Box, Paper, Tabs, Tab } from '@mui/material';

import RegistrationTab from './RegistrationTab';
import LoginTab from './LoginTab';

const TabPanel = ({ index, value, children }) => {
	return (
		<div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
			{value === index && <Box>{children}</Box>}
		</div>
	);
};

function a11yProps(index) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}

const LoginPage = () => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		gap: '2rem',
		padding: '20px',
	};

	return (
		<>
			<Typography component="h2" variant="h4" fontWeight="bold" textAlign="center">
				Logowanie/Rejestracja
			</Typography>
			<Paper elevation={3} sx={{ ...boxStyles, margin: '15px' }}>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Tabs value={activeTab} onChange={handleTabChange} aria-label="zakładki logowania i rejestracji">
						<Tab label="Logowanie" {...a11yProps(0)} />
						<Tab label="Rejestracja" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={activeTab} index={0}>
					<Box component="div" sx={boxStyles}>
						<LoginTab />
					</Box>
				</TabPanel>
				<TabPanel value={activeTab} index={1}>
					<Box sx={boxStyles}>
						<RegistrationTab />
					</Box>
				</TabPanel>
			</Paper>
		</>
	);
};

export default LoginPage;

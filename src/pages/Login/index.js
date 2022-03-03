import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

import SectionWrapper from "../../components/SectionWrapper";
import SectionHading from "../../components/SectionHeading";

import RegisterTab from "./RegisterTab";
import LoginTab from "./LoginTab";

const TabPanel = ({ index, value, children }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
		>
			{value === index && <>{children}</>}
		</div>
	);
};

function a11yProps(index) {
	return {
		id: `tab-${index}`,
		"aria-controls": `tabpanel-${index}`,
	};
}

const LoginPage = () => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	return (
		<SectionWrapper>
			<SectionHading>Logowanie/Rejestracja</SectionHading>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					aria-label="zakładki logowania i rejestracji"
				>
					<Tab label="Logowanie" {...a11yProps(0)} />
					<Tab label="Rejestracja" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={activeTab} index={0}>
				<LoginTab />
			</TabPanel>
			<TabPanel value={activeTab} index={1}>
				<RegisterTab />
			</TabPanel>
		</SectionWrapper>
	);
};

export default LoginPage;

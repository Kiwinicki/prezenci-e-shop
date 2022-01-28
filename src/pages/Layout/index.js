import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import PageHeader from "../../components/PageHeader";
import PageFooter from "../../components/PageFooter";

const Layout = () => {
	return (
		<>
			<PageHeader />
			{/* flexGrow for footer always on bottom */}
			<Box component="main" sx={{ flexGrow: 1 }}>
				<Outlet />
			</Box>
			<PageFooter />
		</>
	);
};

export default Layout;

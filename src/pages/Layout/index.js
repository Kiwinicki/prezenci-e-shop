import { Outlet } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';

const Layout = () => {
	return (
		<>
			<PageHeader />
			<Outlet />
			<PageFooter />
		</>
	);
};

export default Layout;

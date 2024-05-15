import React from 'react';
import { Outlet, useLocation } from 'umi';

import PortalLayout from './PortalLayout';

const basicLayoutPath = '/portal';

export default function Layout() {
	const location = useLocation();
	const isPortalPage = location.pathname.indexOf(basicLayoutPath) === 0;
	if (isPortalPage && location.pathname !== '/portal/Comp/RglEditor') {
		return <PortalLayout />;
	}
	return <Outlet />;
}

import React, { useEffect } from 'react';
import { Outlet, useLocation, history } from 'umi';

import PortalLayout from './PortalLayout';

const basicLayoutPath = '/portal';

export default function Layout() {

	useEffect(() => {
		if(!sessionStorage.getItem('token')) {
			history.replace('login');
		}
	}, []);

	const location = useLocation();
	const isPortalPage = location.pathname.indexOf(basicLayoutPath) === 0;
	if (isPortalPage) {
		return <PortalLayout />;
	}
	return <Outlet />;
}

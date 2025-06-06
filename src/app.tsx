import 'antd/dist/reset.css';
import './global.css';

import { ConfigProvider } from 'antd';
import React from 'react';
import { AliveScope, autoFixContext } from 'react-activation';
import { history, matchPath } from 'umi';


import { ContextProvider } from '@/context/context';
import Provider from '@/context/Provider';


autoFixContext(
	[require('react/jsx-runtime'), 'jsx', 'jsxs', 'jsxDEV'],
	[require('react/jsx-dev-runtime'), 'jsx', 'jsxs', 'jsxDEV']
);

function validateRouteIsNotExist(allRoutesPath: string[], pathname: string) {
	// 404-page path is /*
	// not judgement 404-path will loop replace to 404
	const isNot404Page = pathname !== '/404';
	const updateCenter = '/portal/UpdateCenter/:type/:id';
	const isUpdateCenter = matchPath(updateCenter, pathname);
	if (!allRoutesPath.includes(pathname) && isNot404Page && !isUpdateCenter) {
		// Switch not found page type
		if (pathname.indexOf('/portal') === 0) {
			history.replace('/portal/404');
		} else {
			history.replace('/404');
		}
	}
}

export function onRouteChange({ routes, location }: any) {
	const { pathname } = location;
	const allRoutesPath = Object.keys(routes)
		.filter((item) => !routes[item].isLayout)
		.map((item) =>
			routes[item].path === '/'
				? routes[item].path
				: `/${routes[item].path}`
		);

	console.log(allRoutesPath);
	// check pathname is exists or not
	validateRouteIsNotExist(allRoutesPath, pathname);
}

export function rootContainer(container: React.ReactNode, { routes }: any) {
	return (

		<AliveScope>
			<ContextProvider routes={routes}>
				<ConfigProvider
				>
					<Provider>{container}</Provider>
				</ConfigProvider>
			</ContextProvider>
		</AliveScope>
	);
}

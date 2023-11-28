import 'antd/dist/reset.css';
import './global.css';

import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import React from 'react';
import { AliveScope, autoFixContext  } from 'react-activation';
import { history } from 'umi';

import { ContextProvider } from '@/context/context';
import Provider from '@/context/Provider';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

autoFixContext(
	[require('react/jsx-runtime'), 'jsx', 'jsxs', 'jsxDEV'],
	[require('react/jsx-dev-runtime'), 'jsx', 'jsxs', 'jsxDEV']
);

function validateRouteIsNotExist (allRoutesPath: string[], pathname: string) {
	// 404-page path is /*
	// not judgement 404-path will loop replace to 404
	const isNot404Page = pathname !== '/404';

	if (!allRoutesPath.includes(pathname) && isNot404Page) {
		// Switch not found page type
		if (pathname.indexOf('/portal') === 0) {
			history.replace('/portal/404');
		} else {
			history.replace('/404');
		}
	}
}

export function onRouteChange ({ routes, location }: any) {
	const { pathname } = location;
	const allRoutesPath = Object.keys(routes)
		.filter((item) => !routes[item].isLayout)
		.map((item) =>
			routes[item].path === '/'
				? routes[item].path
				: `/${routes[item].path}`
		);
	// check pathname is exists or not
	validateRouteIsNotExist(allRoutesPath, pathname);
}

export function rootContainer (container: React.ReactNode, { routes }: any) {
	return (
		<ContextProvider routes={routes}>
			<DndProvider backend={HTML5Backend}>
				<ConfigProvider locale={{ ...enUS, Empty: { description: 'no any data' } }}>
					<AliveScope>
						<Provider>{container}</Provider>
					</AliveScope>
				</ConfigProvider>
			</DndProvider>
		</ContextProvider>
	);
}

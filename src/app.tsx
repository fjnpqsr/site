import 'antd/dist/reset.css';

import React from 'react';
import { history } from 'umi';

import { ContextProvider } from '@/context/context';
import Provider from '@/context/Provider';

function validateRouteIsNotExist(allRoutesPath: string[], pathname: 'string') {
    if (!allRoutesPath.includes(pathname)) {
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
    // check pathname is exists or not
    validateRouteIsNotExist(allRoutesPath, pathname);
}

export function rootContainer(container: React.ReactNode) {
    return (
        <ContextProvider>
            <Provider> {container} </Provider>
        </ContextProvider>
    );
}

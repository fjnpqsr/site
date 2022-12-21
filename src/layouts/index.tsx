import React from 'react';
import { Outlet, useLocation } from 'umi';

import BasicLayout from './BasicLayout';

const basicLayoutPath = '/portal';

export default function Layout() {
    const location = useLocation();
    const isNotUseBasicLayout =
        location.pathname.indexOf(basicLayoutPath) === 0;
    if (isNotUseBasicLayout) {
        return <BasicLayout />;
    }
    return <Outlet />;
}

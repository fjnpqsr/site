import { ConfigProvider } from 'antd';
import React, { useContext } from 'react';

import { context } from '@/context/context';
import { getTheme } from '@/themes';

const Provider = (props: any) => {
    const { state } = useContext(context);
    const { theme } = state;
    const themeTokenMapping = getTheme(theme);
    return (
        <ConfigProvider theme={themeTokenMapping}>
            {props.children}
        </ConfigProvider>
    );
};

export default Provider;

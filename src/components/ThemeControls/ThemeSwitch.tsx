import { Switch } from 'antd';
import React, { useContext } from 'react';

import { context } from '@/context/context';

const ThemeSwitch = () => {
    const { state, updateContext } = useContext(context);
    const handleSwitch = (checked: boolean) => {
        const themeSlogan = checked ? 'light' : 'dark';
        updateContext({ type: 'theme', payload: themeSlogan });
    };
    return (
        <Switch
            checkedChildren={'light'}
            unCheckedChildren={'dark'}
            checked={state.theme === 'light'}
            onChange={handleSwitch}
        />
    );
};

export default ThemeSwitch;

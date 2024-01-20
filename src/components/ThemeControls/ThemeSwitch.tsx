import { Switch } from 'antd';
import React, { useContext } from 'react';

import { context } from '@/context/context';
import { useAliveController } from 'react-activation';

const ThemeSwitch = () => {
	const { state, updateContext } = useContext(context);
	const { clear } = useAliveController();

	const handleSwitch = (checked: boolean) => {
		const themeSlogan = checked ? 'light' : 'dark';
		updateContext({ type: 'theme', payload: themeSlogan });
		clear();
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

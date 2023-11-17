import { theme } from 'antd';

import tokenConfig from '@/themes/tokenConfig';

const { darkAlgorithm } = theme;
export default {
	algorithm: darkAlgorithm,
	token: {
		...tokenConfig,
		'colorPrimary': '#a0d911',
		'colorInfo': '#a0d911',
		
		// colorBgLayout: '#141414', // layout gutter
	},
};

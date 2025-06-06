import { theme } from 'antd';

import tokenConfig from '@/themes/tokenConfig';

const { darkAlgorithm } = theme;
export default {
	algorithm: darkAlgorithm,
	token: {
		...tokenConfig,
		// colorBgLayout: '#141414', // layout gutter
	},
};

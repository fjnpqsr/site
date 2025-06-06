import { theme } from 'antd';

import tokenConfig from '@/themes/tokenConfig';

const { defaultAlgorithm } = theme;

export default {
	algorithm: defaultAlgorithm,
	token: {
		...tokenConfig,
		// colorBgLayout: '#f5f5f5', // layout gutter
	},
};

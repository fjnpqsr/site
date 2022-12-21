import { theme } from 'antd';

import tokenConfig from '@/themes/tokenConfig';

const { defaultAlgorithm } = theme;

export default {
    algorithm: defaultAlgorithm,
    token: {
        ...tokenConfig,
        colorPrimary: 'lightcoral',
        // colorBgLayout: '#f5f5f5', // layout gutter
    },
};

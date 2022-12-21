import { theme } from 'antd';

import tokenConfig from '@/themes/tokenConfig';

const { darkAlgorithm } = theme;
export default {
    algorithm: darkAlgorithm,
    token: {
        ...tokenConfig,
        colorBgContainer: '#161d3f',
        colorBgBase: '#161d3f',
        colorBgLayout: '#001529', // layout gutter
    },
};

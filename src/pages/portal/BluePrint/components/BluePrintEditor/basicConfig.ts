import G6 from '@antv/g6';
const grid = new G6.Grid({});

export default {
    fitView: true,
    fitCenter: true,
    plugins: [grid],
    defaultEdge: {
        type: 'polyline',
        style: {
            stroke: '#F6BD16',
            lineWidth: 2,
        },
    },
};
import G6 from '@antv/g6';
const grid = new G6.Grid({});
const shapeLine = new G6.SnapLine();
const toolBar = new G6.ToolBar({
    container: 'topology-toolbar'
});
export default {
    fitView: true,
    fitCenter: true,
    plugins: [grid, shapeLine, toolBar],
    defaultEdge: {
        type: 'polyline',
        style: {
            stroke: '#F6BD16',
            lineWidth: 2,
        },
    },
};
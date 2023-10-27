import React, { useEffect, type FC, useRef } from 'react';
import G6 from '@antv/g6';
import './index.less';
import { useDrop } from 'react-dnd';
import { registerBasicNode } from './registerNodes';
import { registerEvents } from './registerEvents';
import basicConfig from './basicConfig';
import { registerCreateEdgeBehavior } from './behaviors/createEdge';
import { registerDragNodeBehavior } from './behaviors/dragNode';


interface TopologyProps {
    className?: string;
    data?: any;
    setChartData?: any;
}

const Topology: FC<TopologyProps> = (props) => {
    const { data, setChartData } = props;
    const graphRef = useRef<any>(null);
    const anchorIndexRef = useRef<any>({
        sourceAnchorIdx: undefined,
        targetAnchorIdx: undefined,
    });
    const startRender = () => {
        const container = document.getElementById('topology-parent');
        if (container === null) {
            return;
        }
        registerBasicNode(G6);
        const width = container.scrollWidth;
        const height = container.scrollHeight;
        const graph = new G6.Graph({
            ...basicConfig,
            container: 'topology',
            width,
            height,
            modes: {
                default: [
                    registerDragNodeBehavior(),
                    registerCreateEdgeBehavior(anchorIndexRef)
                ],
            },
            defaultNode: {
                type: 'basic-node',
                size: [200, 80],
            },

        });
        graph.data(data);
        graph.render();

        registerEvents(graph, anchorIndexRef.current);
        graphRef.current = graph;
    };

    useEffect(() => {
        startRender();
    }, []);

    // data update
    useEffect(() => {
        if (data) {
            graphRef.current?.changeData(data);
        }
    }, [data]);

    //  drop event
    const [{ }, drop] = useDrop(
        () => ({
            accept: 'node-item',
            drop: (item: any, monitor: any) => {
                const { internalMonitor } = monitor;
                const clientOffSet = internalMonitor.getClientOffset();
                const transformedPosition = graphRef.current.getPointByClient(
                    clientOffSet.x,
                    clientOffSet.y
                );
                setChartData(() => {
                    const oldData = graphRef.current.save();
                    const withPositionItem = {
                        ...transformedPosition,
                        id: `${oldData.nodes.length + 1}`,
                        data: item,
                    };
                    const newData = {
                        ...oldData,
                        nodes: [...oldData.nodes, withPositionItem],
                    };
                    return newData;
                });
            },
            collect: (monitor) => ({
                isOver: monitor.isOver({ shallow: true }),
                canDrop: monitor.canDrop(),
            }),
        }),
        [data]
    );

    return (
        <div
            style={{ height: '100%', width: '100%', flex: 1 }}
            id="topology-parent"
            ref={drop}
        >
            <div id="topology" />
        </div>
    );
};
export default Topology;

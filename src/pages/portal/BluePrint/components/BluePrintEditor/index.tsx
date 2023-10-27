import React, { useEffect, type FC, useRef } from 'react';
import G6 from '@antv/g6';
import './index.less';
import { useDrop } from 'react-dnd';
import { registerBasicNode } from './registerNodes';
import { registerEvents } from './registerEvents';
import basicConfig from './basicConfig';


interface TopologyProps {
    className?: string;
    data?: any;
    setChartData?: any;
}

const Topology: FC<TopologyProps> = (props) => {
    const { data, setChartData } = props;
    const graphRef = useRef<any>(null);
    const startRender = () => {
        const container = document.getElementById('topology-parent');
        if (container === null) {
            return;
        }
        let sourceAnchorIdx: any, targetAnchorIdx: any;
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
                    {
                        type: 'drag-node',
                        shouldBegin: (e) => {
                            if (e.target.get('name') === 'anchor-point')
                                return false;
                            return true;
                        },
                    },
                    {
                        type: 'create-edge',
                        trigger: 'drag', // set the trigger to be drag to make the create-edge triggered by drag
                        shouldBegin: (e) => {
                            // avoid beginning at other shapes on the node
                            if (
                                e.target &&
                                e.target.get('name') !== 'anchor-point'
                            )
                                return false;
                            sourceAnchorIdx = e.target.get('anchorPointIdx');
                            e.target.set('links', e.target.get('links') + 1); // cache the number of edge connected to this anchor-point circle
                            return true;
                        },
                        shouldEnd: (e) => {
                            // avoid ending at other shapes on the node
                            if (
                                e.target &&
                                e.target.get('name') !== 'anchor-point'
                            )
                                return false;
                            if (e.target) {
                                targetAnchorIdx =
                                    e.target.get('anchorPointIdx');
                                e.target.set(
                                    'links',
                                    e.target.get('links') + 1
                                ); // cache the number of edge connected to this anchor-point circle
                                return true;
                            }
                            targetAnchorIdx = undefined;
                            return true;
                        },
                    },
                ],
            },
            defaultNode: {
                type: 'basic-node',
                size: [200, 80],
            },

        });
        graph.data(data);
        graph.render();
        registerEvents(graph, { sourceAnchorIdx, targetAnchorIdx });
        graphRef.current = graph;
    };

    useEffect(() => {
        startRender();
    }, []);

    // data update
    useEffect(() => {
        if (data) {
            graphRef.current?.changeData(data, true);
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

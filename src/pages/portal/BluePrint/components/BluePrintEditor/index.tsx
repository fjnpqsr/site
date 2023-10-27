import React, { useEffect, type FC, useRef } from 'react';
import G6 from '@antv/g6';
import './index.less';
import { useDrop } from 'react-dnd';

const grid = new G6.Grid({});
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
        let sourceAnchorIdx:any, targetAnchorIdx:any;

        const width = container.scrollWidth;
        const height = container.scrollHeight;
        // G6.Util.processParallelEdges processes the edges with same source node and target node,
        // on this basis, processParallelEdgesOnAnchorPoint consider the end nodes and anchor points in the same time.
        const processParallelEdgesOnAnchorPoint = (
            edges,
            offsetDiff = 15,
            multiEdgeType = 'polyline',
            singleEdgeType = undefined,
            loopEdgeType = undefined
        ) => {
            const len = edges.length;
            const cod = offsetDiff * 2;
            const loopPosition = [
                'top',
                'top-right',
                'right',
                'bottom-right',
                'bottom',
                'bottom-left',
                'left',
                'top-left',
            ];
            const edgeMap:any = {};
            const tags = [];
            const reverses:any = {};
            for (let i = 0; i < len; i++) {
                const edge = edges[i];
                const { source, target, sourceAnchor, targetAnchor } = edge;
                const sourceTarget = `${source}|${sourceAnchor}-${target}|${targetAnchor}`;

                if (tags[i]) continue;
                if (!edgeMap[sourceTarget]) {
                    edgeMap[sourceTarget] = [];
                }
                tags[i] = true;
                edgeMap[sourceTarget].push(edge);
                for (let j = 0; j < len; j++) {
                    if (i === j) continue;
                    const sedge = edges[j];
                    const {
                        source: src,
                        target: dst,
                        sourceAnchor: srcAnchor,
                        targetAnchor: dstAnchor,
                    } = sedge;

                    // 两个节点之间共同的边
                    // 第一条的source = 第二条的target
                    // 第一条的target = 第二条的source
                    if (!tags[j]) {
                        if (
                            source === dst &&
                            sourceAnchor === dstAnchor &&
                            target === src &&
                            targetAnchor === srcAnchor
                        ) {
                            edgeMap[sourceTarget].push(sedge);
                            tags[j] = true;
                            reverses[
                                `${src}|${srcAnchor}|${dst}|${dstAnchor}|${
                                    edgeMap[sourceTarget].length - 1
                                }`
                            ] = true;
                        } else if (
                            source === src &&
                            sourceAnchor === srcAnchor &&
                            target === dst &&
                            targetAnchor === dstAnchor
                        ) {
                            edgeMap[sourceTarget].push(sedge);
                            tags[j] = true;
                        }
                    }
                }
            }

            // eslint-disable-next-line guard-for-in
            for (const key in edgeMap) {
                const arcEdges:any = edgeMap[key];
                const { length } = arcEdges;
                for (let k = 0; k < length; k++) {
                    const current = arcEdges[k];
                    if (current.source === current.target) {
                        if (loopEdgeType) current.type = loopEdgeType;
                        // 超过8条自环边，则需要重新处理
                        current.loopCfg = {
                            position: loopPosition[k % 8],
                            dist: Math.floor(k / 8) * 20 + 50,
                        };
                        continue;
                    }
                    if (
                        length === 1 &&
                        singleEdgeType &&
                        (current.source !== current.target ||
                            current.sourceAnchor !== current.targetAnchor)
                    ) {
                        current.type = singleEdgeType;
                        continue;
                    }
                    current.type = multiEdgeType;
                    const sign =
                        (k % 2 === 0 ? 1 : -1) *
                        (reverses[
                            `${current.source}|${current.sourceAnchor}|${current.target}|${current.targetAnchor}|${k}`
                        ]
                            ? -1
                            : 1);
                    if (length % 2 === 1) {
                        current.curveOffset = sign * Math.ceil(k / 2) * cod;
                    } else {
                        current.curveOffset =
                            sign * (Math.floor(k / 2) * cod + offsetDiff);
                    }
                }
            }
            return edges;
        };

        G6.registerNode(
            'basic-node',
            {
                afterDraw(cfg: any, group: any) {
                    const bbox = group.getBBox();
                    const anchorPoints = this.getAnchorPoints(cfg);
                    anchorPoints.forEach((anchorPos:any, i: number) => {
                        group.addShape('circle', {
                            attrs: {
                                r: 5,
                                x: bbox.x + bbox.width * anchorPos[0],
                                y: bbox.y + bbox.height * anchorPos[1],
                                fill: '#fff',
                                stroke: '#5F95FF',
                            },
                            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                            name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
                            anchorPointIdx: i, // flag the idx of the anchor-point circle
                            links: 0, // cache the number of edges connected to this shape
                            visible: false, // invisible by default, shows up when links > 1 or the node is in showAnchors state
                            draggable: true, // allow to catch the drag events on this shape
                        });
                    });
                },
                getAnchorPoints(cfg: any) {
                    return (
                        cfg.anchorPoints || [
                            [0, 0.5],
                            [0.33, 0],
                            [0.66, 0],
                            [1, 0.5],
                            [0.33, 1],
                            [0.66, 1],
                        ]
                    );
                },
                setState(name, value, item: any) {
                    if (name === 'showAnchors') {
                        const anchorPoints = item
                            .getContainer()
                            .findAll(
                                (ele: any) => ele.get('name') === 'anchor-point'
                            );
                        anchorPoints.forEach((point: any) => {
                            if (value || point.get('links') > 0) point.show();
                            else point.hide();
                        });
                    }
                },
            },
            'rect'
        );
        const graph = new G6.Graph({
            container: 'topology',
            width,
            height,
              fitView: true,
              fitCenter: true,
            plugins: [grid],
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
            defaultEdge: {
                type: 'polyline',
                style: {
                  stroke: '#F6BD16',
                  lineWidth: 2,
                  endArrow: {
                    path: G6.Arrow.triangle(),
                  },
                },
              },
        });
        // graph.on('canvas:mousemove', (evt) => {
        //     console.log('evt', {evt});
        // });
        graph.data(data);
        graph.render();

        graph.on('aftercreateedge', (e) => {
            // update the sourceAnchor and targetAnchor for the newly added edge
            graph.updateItem(e.edge, {
                sourceAnchor: sourceAnchorIdx,
                targetAnchor: targetAnchorIdx,
            });

            // update the curveOffset for parallel edges
            const edges:any = graph.save().edges;
            processParallelEdgesOnAnchorPoint(edges);
            graph.getEdges().forEach((edge, i) => {
                graph.updateItem(edge, {
                    curveOffset: edges[i].curveOffset,
                    curvePosition: edges[i].curvePosition,
                });
            });
        });

        // after drag from the first node, the edge is created, update the sourceAnchor
        graph.on('afteradditem', (e) => {
            if (e.item && e.item.getType() === 'edge') {
                graph.updateItem(e.item, {
                    sourceAnchor: sourceAnchorIdx,
                });
            }
        });

        // if create-edge is canceled before ending, update the 'links' on the anchor-point circles
        graph.on('afterremoveitem', (e:any) => {
            if (e.item && e.item.source && e.item.target) {
                const sourceNode = graph.findById(e.item.source);
                const targetNode = graph.findById(e.item.target);
                const { sourceAnchor, targetAnchor } = e.item;
                if (sourceNode && !isNaN(sourceAnchor)) {
                    const sourceAnchorShape = sourceNode
                        .getContainer()
                        .find(
                            (ele) =>
                                ele.get('name') === 'anchor-point' &&
                                ele.get('anchorPointIdx') === sourceAnchor
                        );
                    sourceAnchorShape.set(
                        'links',
                        sourceAnchorShape.get('links') - 1
                    );
                }
                if (targetNode && !isNaN(targetAnchor)) {
                    const targetAnchorShape = targetNode
                        .getContainer()
                        .find(
                            (ele) =>
                                ele.get('name') === 'anchor-point' &&
                                ele.get('anchorPointIdx') === targetAnchor
                        );
                    targetAnchorShape.set(
                        'links',
                        targetAnchorShape.get('links') - 1
                    );
                }
            }
        });
        graph.on('node:mouseenter', (e:any) => {
            graph.setItemState(e.item, 'showAnchors', true);
        });
        graph.on('node:mouseleave', (e:any) => {
            graph.setItemState(e.item, 'showAnchors', false);
        });
        graph.on('node:dragenter', (e:any) => {
            graph.setItemState(e.item, 'showAnchors', true);
        });
        graph.on('node:dragleave', (e:any) => {
            graph.setItemState(e.item, 'showAnchors', false);
        });
        graph.on('node:dragstart', (e:any) => {
            graph.setItemState(e.item, 'showAnchors', true);
        });
        graph.on('node:dragout', (e:any) => {
            graph.setItemState(e.item, 'showAnchors', false);
        });

        graphRef.current = graph;
    };

    useEffect(() => {
        startRender();
    }, []);

    useEffect(() => {
        if (data) {
            graphRef.current?.changeData(data, true);
        }
    }, [data]);
    window.graph = graphRef.current;
    const [{}, drop] = useDrop(
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

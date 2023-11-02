import G6, { Graph } from '@antv/g6';
import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';

import css from './index.less';
import { registerEvents } from './registerEvents';
import { RegisterNode } from './RegisterNode';

interface BluePrintEditor {
	className?: string;
	data?: any;
	setData?: any;
	onNodeClick?: any;
}
const BluePrintEditor: React.FC<BluePrintEditor> = (props) => {
	const { data, setData } = props;
	const graphRef = useRef<any>(null);
	// const [dataSource] = useState<GraphData>(data);
	const canvasRef = useRef<any>(null);
	const anchorIndexRef = useRef<any>({
		sourceAnchorIdx: undefined,
		targetAnchorIdx: undefined,
	});
	RegisterNode();
	useEffect(() => {
		const container = document.getElementById('container');

		if (container === null || graphRef.current) {
			return;
		}
		const width = container.scrollWidth;
		const height = container.scrollHeight;

		const graph: Graph = new G6.Graph({
			container: canvasRef.current,
			width,
			height,
			plugins: [new G6.Grid()],
			defaultNode: {
				type: 'test',
				size: [200, 80],
			},
			defaultEdge: {
				type: 'polyline',
				style: {
					stroke: '#F6BD16',
					lineWidth: 2,
				},
			},
			modes: {
				default: [
					'zoom-canvas',
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
							anchorIndexRef.current.sourceAnchorIdx =
								e.target.get('anchorPointIdx');
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
								anchorIndexRef.current.targetAnchorIdx =
									e.target.get('anchorPointIdx');
								e.target.set(
									'links',
									e.target.get('links') + 1
								); // cache the number of edge connected to this anchor-point circle
								return true;
							}
							anchorIndexRef.current.targetAnchorIdx = undefined;
							return true;
						},
					},
				],
			},
		});

		graph.data(data);
		graph.render();
		registerEvents(graph, anchorIndexRef.current);
		graphRef.current = graph;
		graphRef.current.container = container;
	}, []);

	useEffect(() => {
		if (data) {
			graphRef.current?.changeData(data);
		}
	}, [data]);

	const [, drop] = useDrop(
		() => ({
			accept: 'node-item',
			drop: (item: any, monitor: any) => {
				const { internalMonitor } = monitor;
				const clientOffSet = internalMonitor.getClientOffset();
				const transformedPosition = graphRef.current.getPointByClient(
					clientOffSet.x,
					clientOffSet.y
				);

				setData(() => {
					const oldData = graphRef.current.save();
					const withPositionItem = {
						...transformedPosition,
						...item,
						id: `${oldData.nodes.length + 1}`,
						type: item.type,
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
			style={{
				flex: 1,
				position: 'relative',
				width: '100%',
				height: '100%',
			}}
			id="container"
			ref={drop}
		>
			<div ref={canvasRef} className={css['blueprint-wrapper']} />
		</div>
	);
};
export default BluePrintEditor;

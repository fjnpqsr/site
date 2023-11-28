import G6 from '@antv/g6';
import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import basicConfig from './basicConfig';
import { registerCreateEdgeBehavior } from './behaviors/createEdge';
import { registerDragNodeBehavior } from './behaviors/dragNode';
import './index.less';
import { registerEvents } from './registerEvents';
import { registerBasicNode } from './registerNodes';
import { registerVMNode } from './registerNodes/VM';

interface TopologyProps {
	className?: string;
	data?: any;
	setChartData?: any;
	onNodeClick?: any;
	graphRef: any;
}

const Topology: React.FC<TopologyProps> = (props) => {
	const { data, setChartData, onNodeClick, graphRef } = props;
	const anchorIndexRef = useRef<any>({
		sourceAnchorIdx: undefined,
		targetAnchorIdx: undefined,
	});
	const startRender = () => {
		const container = document.getElementById('topology-parent');
		if (container === null || graphRef.current) {
			return;
		}

		registerBasicNode(G6);
		registerVMNode();
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
					registerCreateEdgeBehavior(anchorIndexRef),
					'zoom-canvas',
					'drag-canvas',
				],
			},
			defaultNode: {
				type: 'basic-node',
				size: [200, 80],
			},
		});
		graph.data(data);
		graph.render();
		graph.on('node:click', (e) => {
			if (onNodeClick) {
				onNodeClick(e);
			}
		});
		registerEvents(graph, anchorIndexRef.current);
		graphRef.current = graph;
		graphRef.current.container = container;
		if (typeof window !== 'undefined') {
			window.onresize = () => {
				if (!graph || graph.get('destroyed')) return;
				if (
					!container ||
					!container.scrollWidth ||
					!container.scrollHeight
				)
					return;
				graph.changeSize(container.scrollWidth, container.scrollWidth);
			};
		}
	};

	useEffect(() => {
		setTimeout(() => {
			startRender();
		});
	}, []);

	// data update
	useEffect(() => {
		if (data) {
			graphRef.current?.changeData(data);
		}
	}, [data]);
	//  drop event
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

				setChartData(() => {
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
			style={{ flex: 1, position: 'relative' }}
			id="topology-parent"
			ref={drop}
		>
			<div id="topology" />
			<div id="topology-toolbar"></div>
		</div>
	);
};
export default Topology;

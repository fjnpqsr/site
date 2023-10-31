import React, { useEffect, useRef, useState } from 'react';
import PageContainer from '@/components/PageContainer';
import data from './data.json';
import G6, { GraphData, Graph } from '@antv/g6';
import { registerNodes } from './nodes';
import css from './index.module.less';
import { appenAutoShapeListener } from '@antv/g6-react-node';


const CustomNodeView = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<any>(null);
	const graphRef = useRef<any>(null);
	const [dataSource] = useState<GraphData>(data);

	useEffect(() => {
		if (containerRef.current === null || graphRef.current) {
			return;
		}
		const width = containerRef.current.scrollWidth;
		const height = containerRef.current.scrollHeight;
		registerNodes(['basicNode']);
		const graph:Graph = new G6.Graph({
			container: canvasRef.current,
			width,
			height,
			plugins: [new G6.Grid()],
			modes: {
				default: ['zoom-canvas', 'drag-canvas'],
			},
			// nodeStateStyles: {
			// 	hover: {
			// 		fillOpacity: 0.1,
			// 		lineWidth: 10,
			// 	},
			// },
			defaultNode: {
				type: 'rect',
				size: [200, 80],
			},
		});
		appenAutoShapeListener(graph);
		graph.data(dataSource);
		graph.render();
	}, []);

	return (
		<PageContainer>
			<div
				style={{
					flex: 1,
					position: 'relative',
					width: '100%',
					height: '100%',
				}}
				ref={containerRef}
			>
				<div ref={canvasRef} className={css['blueprint-wrapper']} />
			</div>
		</PageContainer>
	);
};

export default CustomNodeView;

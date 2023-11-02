import G6, { ModelConfig } from '@antv/g6';
import {
	createNodeFromReact,
	Group,
	Image,
	Rect,
	Text,
} from '@antv/g6-react-node';
import React from 'react';
const Card: React.FC<{ cfg: ModelConfig }> = ({ cfg }) => {
	return (
		<Group>
			<Group>
				<Rect
					style={{
						width: 200,
						height: 40,
						fill: cfg?.color || '#5173EB',
						radius: [6, 6, 0, 0],
						padding: [0, 10],
						cursor: 'move',
						display: 'flex',
						flexDirection: 'row',
						// justifyContent: 'center',
						alignItems: 'center',
						stroke: cfg?.color || '#5173EB',
						fillOpacity: 1,
					}}
					draggable
				>
					<Text
						style={{
							fontWeight: 'bold',
							fill: '#fff',
						}}
					>
						{cfg.label}
					</Text>
				</Rect>
			</Group>
			<Rect
				style={{
					width: 200,
					height: 55,
					stroke: cfg?.color || '#5173EB',
					fill: '#F0F6FF',
					radius: [0, 0, 6, 6],
					opacity: 1,
					display: 'flex',
					flexDirection: 'row',
					// justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Image
					style={{
						margin: [0, 10],
						width: 40,
						height: 38,
						img: cfg.img,
						size: 40,
					}}
				></Image>
				<Text
					style={{
						fill: '#000000D9',
						fontWeight: 'bold',
					}}
				>
					{cfg.description}
				</Text>
			</Rect>
		</Group>
	);
};

export const RegisterNode = () => {
	return G6.registerNode('test', {
		...createNodeFromReact(Card),
		afterDraw(cfg, group) {
			const bbox = group?.getBBox();
			const anchorPoints = this.getAnchorPoints(cfg);
			anchorPoints.forEach((anchorPos, i) => {
				group?.addShape('circle', {
					attrs: {
						r: 5,
						x: bbox.x + bbox.width * anchorPos[0],
						y: bbox.y + bbox.height * anchorPos[1],
						fill: '#fff',
						stroke: '#5F95FF',
					},
					// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
					name: 'anchor-point', // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
					anchorPointIdx: i, // flag the idx of the anchor-point circle
					links: 0, // cache the number of edges connected to this shape
					visible: true, // invisible by default, shows up when links > 1 or the node is in showAnchors state
					draggable: true, // allow to catch the drag events on this shape
				});
			});
		},

		getAnchorPoints(cfg) {
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
		// response the state changes and show/hide the link-point circles
		setState(name, value, item) {
			if (name === 'showAnchors') {
				const anchorPoints = item
					.getContainer()
					.findAll((ele) => ele.get('name') === 'anchor-point');
				anchorPoints.forEach((point) => {
					if (value || point.get('links') > 0) point.show();
					else point.hide();
				});
			}
		},
	});
};

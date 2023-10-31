import React, { FC } from 'react';
import G6, {ModelConfig} from '@antv/g6';
import { Rect, Text, Group, createNodeFromReact} from '@antv/g6-react-node';


const BasicNode: FC<{ cfg: ModelConfig; }> = ({cfg}) => {
	return (
		<Group
			zIndex={1}
		>
			<Rect
				onMouseOut={(e) => {
					e.item?.update({style: {opacity: 1}});
					e.item?.setState('hover', false);
				}}
				onMouseOver={(e) => {
					if (e.item && !e.item.hasState('hover')) {
						e.item?.update({style: {opacity: 0.4}});
						e.item?.setState('hover', true);
					}
				}}
				style={{
					fill: '#000',
					padding: [5, 10],
					radius: [4],
					margin: [0, 8],
					width: 200, 
					height: 80,
					cursor:'pointer',
					opacity: cfg.style.opacity

				}}
			>
				<Text style={{ fill: '#fff', fontSize: 10 }}>{cfg.desc}</Text>
			</Rect>
		</Group>
	);
};

export const registerBasicNode=() => {
	G6.registerNode('basicNode', createNodeFromReact(BasicNode));
};
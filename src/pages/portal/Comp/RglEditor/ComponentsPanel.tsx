import React from 'react';
import {Collapse} from 'antd';

export default function ComponentsPanel() {

	const data = [
		{
			group: '容器组件',
			groupKey: 'container',
			components: [
				{}
			]
		}
	];


	const items = [
		{
			key: 'container',
			label: '容器组件',
			children: (
				123
			)
		}
	];

	return (
		<div className='Rgl-components-panel'>
			<Collapse 
				items={items} 
				size='small' 
				defaultActiveKey={['container']} 
			/>
		</div>
	);
}

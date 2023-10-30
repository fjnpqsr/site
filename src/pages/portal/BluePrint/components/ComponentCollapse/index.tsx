import React, { FC } from 'react';
import { Collapse } from 'antd';
import {componentsCategory} from './data';
import ComponentItemGroup from '../ComponentItem';


interface ComponentCollapseProps {
    children?: React.ReactNode;
}
const ComponentCollapse:FC<ComponentCollapseProps> = () => {

	return (
		<Collapse 
			size='small'
			defaultActiveKey={'1'}
		>
			{componentsCategory.map(item => (
				<Collapse.Panel header={item.label} key={item.key}>
					<ComponentItemGroup 
						data={item.components}
					/>
				</Collapse.Panel>
			))}
		</Collapse>
	);
};

export default ComponentCollapse;
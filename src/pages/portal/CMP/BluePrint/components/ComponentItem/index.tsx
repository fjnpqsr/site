import React, { FC } from 'react';
import { Avatar, List, Space } from 'antd';
import { useDrag } from 'react-dnd';

interface ComponentItemProps {
    data: any;
}

const ComponentItem = (props: any) => {
	const { data } = props;
	const [{ isDragging, }, drag,] = useDrag(() => ({
		type: 'node-item',
		item: data,
		end: (item) => {
			console.log('[dnd] drag end, item: ', item);
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}));



	return (
		<List.Item style={{ opacity: isDragging ? 0.4 : 1 }}>
			<Space direction='vertical' align='center' style={{ width: '100%' }} ref={drag}>
				<Avatar src={data.image} />
				<div>{data.name}</div>
			</Space>
		</List.Item>
	);
};

const ComponentItemGroup: FC<ComponentItemProps> = (props) => {

	const { data = [] } = props;
	return (
		<List
			grid={{ gutter: 16, column: 4 }}
			dataSource={data}
			renderItem={(item: any) => (
				<ComponentItem data={item} />
			)}
		/>
	);
};

export default ComponentItemGroup;
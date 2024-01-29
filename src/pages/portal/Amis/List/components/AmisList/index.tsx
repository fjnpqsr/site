import React, { useState } from 'react';
import {render} from 'amis';
import {Button} from 'antd';
import '../TableHeader';

interface mockDataItem {
    name: string;
    age: number;
    remark: string
}

const ListComponent = () => {

	const mockData = [
		{name: 'qsr', age: 31, remark: 'web worker'},
		{name: 'xj', age: 28, remark: 'teacher'},
	];
	const [data, setData] = useState<mockDataItem[]>(mockData);

	const removeItem = (name: string) => {
		setData(data.filter((item) => item.name!==name));
	};

	const schemas = {
		'type': 'page',
		'data': {
			'rows': data
		},
		'body': [
			{
				type: 'table-header',
				tip: 'this is table header custom component'
			},
			{
				'type': 'table',
				'title': '表格1',
				'name': 'table1',
				'source': '$rows',
				'itemActions': [
					{
						'label': '编辑',
						'type': 'button',
						'actionType': 'dialog',
						'dialog': {
							'title': '编辑',
							'body': '这是个简单的编辑弹框'
						}
					},
					{
						children: (({data}: {data: mockDataItem}) => {
							return (
								<Button type="text" onClick={() => removeItem(data.name)}>删除</Button>
							);
						})
					}
				],
				'columns': [
					{ 'name': 'name', 'label': 'Name' },
					{ 'name': 'age', 'label': 'Age' },
					{ 'name': 'remark', 'label': 'Remark' }
				]
			}
		]
	};
	return (
		<div>
			{render(schemas)}
		</div>
	);
};

export default ListComponent;
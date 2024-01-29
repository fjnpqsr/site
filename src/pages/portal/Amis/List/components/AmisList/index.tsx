import React, { useState } from 'react';
import {render} from 'amis';
import {Typography} from 'antd';
import '../BluePrint';

interface mockDataItem {
    name: string;
    age: number;
    remark: string
}

const ListComponent = () => {

	const mockData = [
		{name: 'qsr', age: 31, remark: 'web worker'},
		{name: 'xj', age: 28, remark: 'teacher'},
		{name: 'ads', age: 28, remark: 'teacher'},
		{name: 'dxzcj', age: 28, remark: 'teacher'},
		{name: 'xczcxxx', age: 28, remark: 'teacher'},
		{name: 'xjsadsa', age: 28, remark: 'teacher'},
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
						'label': '详情',
						'type': 'button',
						'actionType': 'dialog',
						'dialog': {
							'title': '详情',
							actions: [],
							'body': {
								'type': 'form',
								'static': true,
								'body': [
									{
										'type': 'input-text',
										'name': 'name',
										'label': '姓名：'
									},
									{
										'name': 'age',
										'type': 'input-number',
										'label': '年龄：'
									}
								],
							}
						}
					},
					{
						children: (({data}: {data: mockDataItem}) => {
							return (
								<Typography.Link onClick={() => removeItem(data.name)}>删除</Typography.Link>
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
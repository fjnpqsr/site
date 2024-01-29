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
	const filterData = (name: string) => {
		setData(mockData.filter((item) => item.name.indexOf(name) >= 0));
	};

	return (
		<div>
			{render( {
				'type': 'page',
				'data': {
					'rows': data
				},
				'body': [
					{
						'title': '查询条件',
						'type': 'form',
						'body': [
							{
								'type': 'input-text',
								'name': 'name-keyword',
								'label': '关键字：',
								onEvent: {
									change: {
										actions: [
											{
												actionType: 'custom',
												script: (context:any,doAction:any,event: any)=>{
													const {value} = event.data;
													filterData(value);
												}
											},
										]
									}
								}
							}
						],
						actions: [],
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
										<Typography.Link onClick={() => removeItem(data.name)}>删除(临时组件)</Typography.Link>
									);
								})
							}
						],
						'columns': [
							{ 'name': 'name', 'label': 'Name' },
							{ 'name': 'age', 'label': 'Age' },
							{ 'name': 'remark', 'label': 'Remark' }
						]
					},
					{
						'type': 'alert',
						'body': '下面是注册的自定义组件',
						'level': 'info',
					},
					{
						type: 'blue-print',
						tip: 'this is table header custom component'
					},
				]
			})}
		</div>
	);
};

export default ListComponent;
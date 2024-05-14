import PageContainer from '@/components/PageContainer';
import React, { useState } from 'react';
import {Table, Space, Divider,Typography, Switch } from 'antd';

const TableColumns = () => {
	const [actions, setActions] = useState<string[]>(['···']);
	const [hideDetails, setHideDetails] = useState(false);
	const [hideEditRole, setHideEditRole] = useState(false);

    
	const columns:any = [
		{
			title: 'Username',
			dataIndex: 'username'
		},
		{
			title: 'Login Method',
			dataIndex: 'loginMethod'
		},
		{
			title: 'Name',
			dataIndex: 'name'
		},
		{
			title: 'Email',
			dataIndex: 'email'
		},
		{
			title: 'Mobile',
			dataIndex: 'mobile'
		},
		{
			title: 'Role',
			dataIndex: 'roleList'
		},
		{
			title: 'Status',
			dataIndex: 'status'
		},
		{
			title: 'Creation Date',
			dataIndex: 'createdDate'
		},
		{
			title: 'Actions',
			fixed: 'right',
			width: 180,
			render: (record, _,rowIndex) => {
				console.log({record, rowIndex});
				return (
					<span style={{whiteSpace: 'nowrap'}}>
						{actions.map((item, index) => {
							if (index===1 && rowIndex ===1) {
								return null;
							}
							return (
								<span key={item}>
									{index!==0 && <Divider type="vertical"/>}
									<Typography.Link>{item}</Typography.Link>
								</span>
							);
						})}
					</span>
				);
			}
		},
	];
	const dataSource:any = [
		{
			username: 'Username - 1',
			name: 'Name - 1',
			email: '345239925@qq.com',
			loginMethod: 'Local',
			mobile: '+251-123456789',
			roleList: ['General User'],
			status: 'Active',
			createdDate: '2024-05-11'
		},
		{
			username: 'Username - 2',
			name: 'Name - 2',
			email: 'qiu.shaorong3@iwhalecloud.com',
			loginMethod: 'Local',
			mobile: '+251-123456789',
			roleList: ['General User', 'Administrator'],
			status: 'Suspend',
			createdDate: '2024-05-12'
		},
	];
	return (
		<PageContainer>
			<Space direction="vertical" style={{width: '100%'}}>
				<div>
					<Space align='center'>
						<div>
                            隐藏Details按钮：
							<Switch 
								checked={hideDetails} 
								onChange={(val) => {
									if(val) {
										setActions(actions.filter(item => item!== 'Details'));
									} else {
										setActions(actions.concat('Details').sort());
									}
									setHideDetails(val);
								}}
							/>
						</div>
						<div>
                            隐藏EditRole按钮：
							<Switch 
								checked={hideEditRole} 
								onChange={(val) => {
									setHideEditRole(val);
									if(val) {
										setActions(actions.filter(item => item!== 'Edit Role'));
									} else {
										setActions(actions.concat('Edit Role').sort());
									}
								}}
							/>
						</div>
					</Space>
				</div>
				<Table 
					columns={columns}
					dataSource={dataSource}
					pagination={false}
					size='small'
					scroll={{
						x: 1200
					}}
				/>
			</Space>
		</PageContainer>
	);
};

export default TableColumns;
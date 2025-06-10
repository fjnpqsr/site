/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Descriptions, DescriptionsProps, Drawer } from 'antd';
import { useRef } from 'react';
import PageContainer from '@/components/PageContainer';

import { apis } from '@/constant/apis';
import useRequest from '@/utils/useRequest';
export const waitTimePromise = async (time: number = 100) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
};

export const waitTime = async (time: number = 100) => {
	await waitTimePromise(time);
};

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};


const MessagePage = () => {
	const actionRef = useRef<ActionType>();
	const [detail, setDetail] = useState<any>(null);
	const {request} = useRequest();

	const columns: ProColumns<GithubIssueItem>[] = [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 48,
		},
		{
			title: '姓名',
			dataIndex: 'name',
			copyable: true,
			ellipsis: true,
			formItemProps: {
				rules: [
					{
						required: true,
						message: 'This field is required',
					},
				],
			},
		},
		{
			title: '联系方式',
			key: 'phone',
			dataIndex: 'phone',
		},
		{
			title: '联系时间',
			key: 'showTime',
			dataIndex: 'createTime',
			valueType: 'date',
			hideInSearch: true,
		},
		{
			title: '操作',
			valueType: 'option',
			key: 'option',
			render: (text, record) => [
				<a
					onClick={()=> {
						setDetail(record);
					}}
					target="_blank"
					rel="noopener noreferrer"
					key="view"
				>
                详情
				</a>,
			
			],
		},
	];
	const items: DescriptionsProps['items'] = [
		{
			label: '姓名',
			children: detail?.name,
			span: 3, 
		},
		{
			label: '联系方式',
			span: 3, 
			children: detail?.phone,
		},
		{
			label: '联系时间',
			span: 3, 
			children: detail?.createTime,
		},
		{
			label: '留言',
			span: 3, 
			children: detail?.message
		},
	];
	return (
		<PageContainer>
			<ProTable<GithubIssueItem>
				columns={columns}
				actionRef={actionRef}
				cardBordered
				request={async (params) => {
					await waitTime(2000);
					return request<{
                        data: GithubIssueItem[];
                    }>(apis.message.list, {
                    	method: 'post',
                    	data: params
                    });
				}}
				columnsState={{
					persistenceKey: 'pro-table-singe-demos',
					persistenceType: 'localStorage',
					defaultValue: {
						option: { fixed: 'right', disable: true },
					},
					onChange(value) {
						console.log('value: ', value);
					},
				}}
				rowKey="id"
				search={{
					labelWidth: 'auto',
				}}
				options={{
					setting: {
						listsHeight: 400,
					},
				}}
				form={{
					syncToUrl: (values, type) => {
						if (type === 'get') {
							return {
								...values,
								created_at: [values.startTime, values.endTime],
							};
						}
						return values;
					},
				}}
				pagination={{
					pageSize: 10,
					onChange: (page) => console.log(page),
				}}
				dateFormatter="string"
				headerTitle="信息列表"
			/>
			<Drawer
				width={600}
				open={detail}
				onClose={() => {
					setDetail(null);
				}}
				title={'详情'}
			>
				<Descriptions labelStyle={{width: 120}} bordered items={items} />
			</Drawer>
		</PageContainer>
	);
};

export default MessagePage;

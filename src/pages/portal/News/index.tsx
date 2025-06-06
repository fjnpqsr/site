/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import PageContainer from '@/components/PageContainer';
import request from 'umi-request';
import { history } from 'umi';

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
	const columns: ProColumns<GithubIssueItem>[] = [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 48,
		},
		{
			title: '姓名',
			dataIndex: 'title',
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
			key: 'showTime',
			dataIndex: 'created_at',
		},
		{
			title: '联系时间',
			key: 'showTime',
			dataIndex: 'created_at',
			valueType: 'date',
			hideInSearch: true,
		},
		{
			title: 'Actions',
			valueType: 'option',
			key: 'option',
			render: (text, record) => [
				<a
					onClick={()=> {
						history.push(`/portal/updateCenter/news/${record.id}`);
					}}
					key="view"
				>
                View
				</a>,
			
			],
		},
	];

	return (
		<PageContainer>
			<ProTable<GithubIssueItem>
				columns={columns}
				actionRef={actionRef}
				cardBordered
				request={async (params, sort, filter) => {
					console.log(sort, filter);
					await waitTime(2000);
					return request<{
                        data: GithubIssueItem[];
                    }>('https://proapi.azurewebsites.net/github/issues', {
                    	params,
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
			
		</PageContainer>
	);
};

export default MessagePage;

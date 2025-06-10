/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import PageContainer from '@/components/PageContainer';
import { history } from 'umi';
import useRequest from '@/utils/useRequest';
import { apis } from '@/constant/apis';
import { Button, Modal } from 'antd';
import useMediaForm from '../UpdateCenter/$type/hooks/useMediaForm';



const MessagePage = () => {
	const actionRef = useRef<ActionType>();
	const { deleteMedia } = useMediaForm(false);
	const { request } = useRequest();
	const columns: ProColumns[] = [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 48,
		},
		{
			title: '标题',
			dataIndex: 'title',
			ellipsis: true,
		},
		{
			title: '副标题',
			key: 'subtitle',
			dataIndex: 'subtitle',
			ellipsis: true,
		},
		{
			title: '更新时间',
			key: 'updateTime',
			dataIndex: 'updateTime',
			valueType: 'dateTime',
			hideInSearch: true,
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			valueType: 'dateTime',
			hideInSearch: true,
		},
		{
			title: '操作',
			valueType: 'option',
			key: 'option',
			render: (text, record) => [
				<a
					onClick={() => {
						history.push(`/portal/updateCenter/services/${record.id}`);
					}}
					key="view"
				>
					详情
				</a>,
				<a
					onClick={() => {
						Modal.confirm({
							type: 'error',
							title: '提示',
							content: '你确定要删除这条服务数据吗?',
							okType: 'danger',
							okButtonProps: {
								type: 'primary',
							},
							onOk: () => {
								return deleteMedia({
									id: record?.id,
									back: false,
									callback: () => {
										actionRef?.current?.reload();
									},
								});
							},
						});
					}}
					style={{ color: 'red' }}
					key="delete"
				>
					删除
				</a>,
			],
		},
	];

	return (
		<PageContainer>
			<ProTable
				columns={columns}
				actionRef={actionRef}
				cardBordered
				request={async (params) => {
					return request(apis.rich.list, {
						method: 'post',
						data: {
							type: 'services',
							...params,
						},
					});
				}}
				columnsState={{
					persistenceKey: 'pro-table-singe-demos',
					persistenceType: 'localStorage',
					defaultValue: {
						option: { fixed: 'right', disable: true },
					},
				}}
				rowKey="id"
				search={false}
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
							};
						}
						return values;
					},
				}}
				pagination={{
					pageSize: 10,
				}}
				toolBarRender={() => [
					<Button key='new' type='primary' onClick={() => {
						history.push('/portal/UpdateCenter/services/create');
					}}>新增服务</Button>
				] }
				dateFormatter="string"
				headerTitle="服务列表"
			/>
		</PageContainer>
	);
};

export default MessagePage;

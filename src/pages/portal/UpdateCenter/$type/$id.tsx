import React, { useState } from 'react';
import Container from '@/components/Container';
import PageContainer from '@/components/PageContainer';
import { Breadcrumb,Button,Space } from 'antd';
import {useParams} from 'umi';

export default function UpdateCenter() {
	const {type = '', id, mode = 'view'} = useParams();
	const parents:any = {
		news: {title: '新闻管理'},
		services: {title: '服务管理'},
		jobs: {title: '招聘管理'},
		cases: {title: '案例管理'},
	};
	const [detailMode, setDetailMode] = useState(mode);
	const isEditMode = detailMode === 'edit';
	const isViewMode = detailMode === 'view';
	return (
		<PageContainer transparent padding={false}>
			<Breadcrumb
				style={{
					marginBottom: 12
				}}
				items={[
					{
						title: '首页',
					},
					parents[type],
					{
						title: '详情',
					},
				]}
			/>
			<Container 
				title={(
					<div>
						{`${parents?.[type]?.title}详情`}
					</div>
				)}
				extra={(
					<Space>
						{isViewMode && <Button onClick={() => {history.back();}}>返回</Button>}
						{isEditMode && <Button onClick={() => {setDetailMode('view');}}>取消</Button>}
						{isViewMode && <Button type='primary' onClick={() => {setDetailMode('edit');}}>编辑</Button>}
						{isEditMode && <Button type='primary'>保存</Button>}
						{isViewMode && <Button danger type='primary'>删除</Button>}
					</Space>
				)}
			>
				123
			</Container>
		</PageContainer>
	);
}

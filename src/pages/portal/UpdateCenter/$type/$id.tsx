import React, { useEffect, useState } from 'react';
import Container from '@/components/Container';
import PageContainer from '@/components/PageContainer';
import { Breadcrumb,Button,Divider,Flex,Form,Input,Modal,Space } from 'antd';
import {useParams} from 'umi';

import MediaEditor from '@/components/Editor';
import useMediaForm from './hooks/useMediaForm';

import css from './index.module.less';

export default function UpdateCenter() {
	const {type = '', id} = useParams();
	const [editorRef, setEditorRef] = useState<any>(null);
	
	const [form] = Form.useForm();
	const {create,detail, fetching, update, deleteMedia} = useMediaForm();

	const parents:any = {
		news: {title: '新闻管理'},
		services: {title: '服务管理'},
		jobs: {title: '招聘管理'},
		cases: {title: '案例管理'},
	};



	const handleFinish = (values:any) => {
		if (id && id!=='create') {
			update({
				id: detail.id,
				description: values.description,
				title: values.title,
				subtitle: values.subtitle,
				type: 'news'

			});	
		} else {
			create({
				description: values.description,
				title: values.title,
				subtitle: values.subtitle,
				type: 'news'

			});
		}
	};

	useEffect(() => {
		if (detail) {
			setTimeout(() => {});
			form.setFieldsValue(detail);
			editorRef.setHtml(detail.description);
		}
	}, [detail]);

	return (
		<PageContainer transparent padding={false}>
			<Breadcrumb
				style={{
					marginBottom: 12
				}}
				items={[
					{title: '首页'},
					parents[type],
					{title: '详情'},
				]}
			/>
			<Flex style={{height: '95%'}}>
				{id!=='create' && (
					<Container 
						spinning={fetching}
						title={(
							<div>
								{`${parents?.[type]?.title}详情`}
							</div>
						)}
						extra={(
							<Space>
								<Button onClick={() => {history.back();}}>返回</Button>
								{id !== 'new' && (
									<Button danger type='primary' onClick={() => {
										Modal.confirm({
											type: 'error',
											title: '提示',
											content: '你确定要删除这条Banner配置吗',
											okType: 'danger',
											okButtonProps: {
												type: 'primary',
											},
											onOk: () => {
												return deleteMedia({ id: detail?.id });
											},
										});
									}}>删除</Button>
								)}
							</Space>
						)}
						style={{
							marginRight: 12,
						}}
					>

					
						<div className={css.previewContainer}>
							<h1 className={css.title}>{detail?.title}</h1>
							{detail?.title && (
								<Divider size='small'/>
							)}
							<p className={css.subtitle}>{detail?.subtitle}</p>
							<div dangerouslySetInnerHTML={{__html: detail?.description}}/>
						</div>
					</Container>
				)}
				<Container 
					spinning={fetching}
					title={'编辑'}
					extra={(
						<Space>
							{id === 'create' && (
								<Button onClick={() => {history.back();}}>返回</Button>
							)}
							<Button type='primary' onClick={() => {form.submit();}}>保存</Button>
						</Space>
					)}
				>
					<Form form={form} layout="vertical" onFinish={handleFinish} disabled={fetching}>
						<Form.Item name="title" label="标题" rules={[{required: true, message: '请输入标题'}]}>
							<Input placeholder="请输入标题" size='small'/>
						</Form.Item>
						<Form.Item name="subtitle" label="副标题" rules={[{required: true, message: '请输入副标题'}]}>
							<Input placeholder="请输入副标题" size='small'/>
						</Form.Item>
						<Form.Item name="description" label="内容" rules={[{required: true, message: '请输入内容'}]}>
							<MediaEditor
								editorRef={editorRef} 
								setEditorRef={setEditorRef}
								onChange={(val: string) => {
									form.setFieldValue('description', val);
								}} 
							/>
						</Form.Item>
					</Form>
				
				</Container>
			</Flex>
		</PageContainer>
	);
}

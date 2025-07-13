import React, { useEffect, useState } from 'react';
import Container from '@/components/Container';
import PageContainer from '@/components/PageContainer';
import {
	Breadcrumb,
	Button,
	Divider,
	Flex,
	Form,
	Input,
	Modal,
	Space,
	Image,
	Upload,
	GetProp,
	UploadProps,
	UploadFile,
	
} from 'antd';
import { useParams } from 'umi';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
import MediaEditor from '@/components/Editor';
import useMediaForm from './hooks/useMediaForm';

import css from './index.module.less';
import { PlusOutlined } from '@ant-design/icons';
import { IMAGE_PREFIX } from '@/constant';

export default function UpdateCenter() {
	const { type = '', id } = useParams();
	const [editorRef, setEditorRef] = useState<any>(null);
	const [uploading, setUploading] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [fileList, setFileList] = useState<any>([]);
	const [form] = Form.useForm();
	const getBase64 = (file: FileType): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};
	const { create, detail, fetching, update, deleteMedia } = useMediaForm();
	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			<PlusOutlined
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	const parents: any = {
		// news: {title: '新闻管理'},
		// services: {title: '服务管理'},
		jobs: { title: '招聘管理' },
		cases: { title: '案例管理' },
	};

	const handleFinish = (values: any) => {
		if (id && id !== 'create') {
			update({
				id: detail.id,
				description: type === 'cases' ? ' ' :values.description ,
				title: values.title,
				subtitle: values.subtitle,
				json: JSON.stringify({
					position: values.position,
					workingYears: values.workingYears,
					qualification: values.qualification,
					img: imageUrl,
					projectContent: values.projectContent,
				}),
				type: type,
			});
		} else {
			create({
				description: type === 'cases' ? ' ' :values.description ,
				title: values.title,
				subtitle: values.subtitle,
				json: JSON.stringify({
					position: values.position,
					workingYears: values.workingYears,
					qualification: values.qualification,
					img: imageUrl,
					projectContent: values.projectContent,
				}),
				type: type,
			});
		}
	};
	const handleChange: UploadProps['onChange'] = (info) => {
		setFileList(info.fileList);
		if (info.file.status === 'uploading') {
			setUploading(true);
			return;
		}
		if (info.file.status === 'done') {
			setImageUrl(`${IMAGE_PREFIX}${info.file.response.data}`);
			setUploading(false);
		}
	};
	useEffect(() => {
		if (detail) {
			console.log({detail});
			const {img} = JSON.parse(detail.json || '{}');
			form.setFieldsValue(detail);
			
			if (img) {
				setImageUrl(img);
				setFileList([{ uid: '-1', url: img }]);
			}
			if (type!=='cases') {
				editorRef.setHtml(detail.description);
			}
		}
	}, [detail]);

	return (
		<PageContainer transparent padding={false}>
			<Breadcrumb
				style={{
					marginBottom: 12,
				}}
				items={[
					{ title: '首页' },
					parents[type],
					{ title: id !== 'create' ? '详情' : '新增' },
				]}
			/>
			<Flex style={{ height: '95%' }}>
				{id !== 'create' && (
					<Container
						spinning={fetching}
						title={
							<div>
								{`${parents?.[type]?.title}${
									id !== 'create' ? '详情' : '新增'
								}`}
							</div>
						}
						extra={
							<Space>
								<Button
									onClick={() => {
										history.back();
									}}
								>
                                    返回
								</Button>
								{id !== 'new' && (
									<Button
										danger
										type="primary"
										onClick={() => {
											Modal.confirm({
												type: 'error',
												title: '提示',
												content:
                                                    '你确定要删除这条Banner配置吗',
												okType: 'danger',
												okButtonProps: {
													type: 'primary',
												},
												onOk: () => {
													return deleteMedia({
														id: detail?.id,
													});
												},
											});
										}}
									>
                                        删除
									</Button>
								)}
							</Space>
						}
						style={{
							marginRight: 12,
						}}
					>
						<div className={css.previewContainer}>
							<h1 className={css.title}>{detail?.title}</h1>
							{detail?.title && (
								<Divider
									size="small"
									style={{ background: '#ccc' }}
								/>
							)}
							<p className={css.subtitle}>{detail?.subtitle || detail?.projectContent}</p>

							<div
								dangerouslySetInnerHTML={{
									__html: detail?.description,
								}}
							/>
						</div>
					</Container>
				)}
				<Container
					spinning={fetching}
					title={'编辑'}
					extra={
						<Space>
							{id === 'create' && (
								<Button
									onClick={() => {
										history.back();
									}}
								>
                                    返回
								</Button>
							)}
							<Button
								type="primary"
								onClick={() => {
									form.submit();
								}}
							>
                                保存
							</Button>
						</Space>
					}
				>
					<Form
						form={form}
						layout="vertical"
						onFinish={handleFinish}
						disabled={fetching}
					>
						<Form.Item
							name="title"
							label="标题"
							rules={[{ required: true, message: '请输入标题' }]}
						>
							<Input placeholder="请输入标题" size="small" />
						</Form.Item>
						{type==='cases' && (
							<Form.Item
								name="projectContent"
								label="副标题"
								rules={[
									{  required: true, message: '请输入副标题' },
								]}
							>
								<Input.TextArea placeholder="请输入副标题" size="small" />
							</Form.Item>
						)}
						{type === 'cases' && (
						
							<Form.Item
								name="img"
								label="Banner图片上传"
								rules={[
									{
										required: true,
										message: '请上传Banner图片',
									},
								]}
							>
								<Upload
									disabled={uploading}
									listType="picture-card"
									action={
										'/official-website/upload/uploadFile'
									}
									className={css.bannerUploader}
									onPreview={handlePreview}
									fileList={fileList}
									onRemove={() => {
										setImageUrl('');
									}}
									onChange={handleChange}
								>
									{imageUrl ? null : uploadButton}
								</Upload>
							</Form.Item>
							
						)}
						{type==='cases' && previewImage && (
							<Image
								wrapperStyle={{ display: 'none' }}
								preview={{
									visible: previewOpen,
									onVisibleChange: (visible) =>
										setPreviewOpen(visible),
									afterOpenChange: (visible) =>
										!visible && setPreviewImage(''),
								}}
								src={previewImage}
							/>
						)}
						{type === 'jobs' && (
							<Form.Item
								name="position"
								label="工作地点"
								rules={[
									{
										required: true,
										message: '请输入工作地点',
									},
								]}
							>
								<Input
									placeholder="请输入工作地点"
									size="small"
								/>
							</Form.Item>
						)}
						{type === 'jobs' && (
							<Form.Item
								name="workingYears"
								label="工作经验"
								rules={[
									{
										required: true,
										message: '请输入工作经验',
									},
								]}
							>
								<Input
									placeholder="请输入工作经验"
									size="small"
								/>
							</Form.Item>
						)}
						{type === 'jobs' && (
							<Form.Item
								name="qualification"
								label="学历"
								rules={[
									{ required: true, message: '请输入学历' },
								]}
							>
								<Input placeholder="请输入学历" size="small" />
							</Form.Item>
						)}
						{type!=='cases' && (
							<Form.Item
								name="description"
								label="内容"
								rules={[{ required: true, message: '请输入内容' }]}
							>
								<MediaEditor
									editorRef={editorRef}
									setEditorRef={setEditorRef}
									onChange={(val: string) => {
										form.setFieldValue('description', val);
									}}
								/>
							</Form.Item>
						)}
					</Form>
				</Container>
			</Flex>
		</PageContainer>
	);
}

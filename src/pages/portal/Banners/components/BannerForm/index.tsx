import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
	Form,
	Input,
	Upload,
	Image,
	UploadProps,
	GetProp,
	UploadFile,
	Space,
	Switch,
	Button,
	Result,
	Flex,
	Modal,
	message,
} from 'antd';
import css from './index.module.less';
import Container from '@/components/Container';
import { ISelectedBanner } from '../..';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const titleMapping: any = {
	new: '新增Banner',
	edit: '编辑Banner',
};
interface BannerFormProps {
    onCancel?: () => void;
    selected: ISelectedBanner|null
}
export default function BannerForm(props: BannerFormProps) {
	const { onCancel, selected } = props;
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<any>([]);
	const [form] = Form.useForm();
	const imageValue = Form.useWatch('image', form);

	const isNullSelected = !selected;

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			<PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

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


	const handleFinish = (values:any) => {
		console.log({ values });
	};

	const handleDelete = () => {
		Modal.confirm({
			type: 'error',
			title: '提示',
			content: '你确定要删除这条Banner配置吗',
			okType: 'danger',
			okButtonProps: {
				type: 'primary'
			},
			onOk: () => {
				message.success('删除成功');
			}
		});
	};


	const DetailTitle = ({ type }: { type: 'new' | 'edit' }) => {
		return (
			<Space>
				{type === 'edit' && (
					<Switch checkedChildren="启用" unCheckedChildren="禁用" />
				)}
				{titleMapping[type]}
			</Space>
		);
	};

	const DetailExtra = ({ type }: { type: 'new' | 'edit' }) => {
		return (
			<Space>
				<Button type="primary" onClick={form.submit}>
                    保存
				</Button>
				<Button onClick={onCancel}>取消</Button>
				{type === 'edit' && (
					<Button type="primary" danger onClick={handleDelete}>
                        删除
					</Button>
				)}
			</Space>
		);
	};

	useEffect(() => {
		if (selected && selected.type === 'edit') {
			form.setFieldsValue({
				title: selected?.title,
				subTitle: selected?.subTitle,
				href: selected?.href,
				image: {
					url: selected?.image
				}
			});
			setFileList([
				{url: selected?.image, stats: 'done', uid: '-1'}
			]);
		} else if (selected && selected?.type=== 'new') {
			form.resetFields();
			setFileList([]);
		}
	}, [selected]);
	console.log({imageValue});
	return (
		<Container
			extra={
				isNullSelected ? null : <DetailExtra type={selected?.type} />
			}
			title={isNullSelected ? '' : <DetailTitle type={selected?.type} />}
			className={isNullSelected ? css.empty : ''}
		>
			{isNullSelected && (
				<Flex style={{ height: '100%' }} vertical justify="center">
					<Result
						status="404"
						title="无数据"
						subTitle="请在左侧列表选中Banner或者新增Banner"
					/>
				</Flex>
			)}
			{!isNullSelected && (
				<Form layout="vertical" form={form} onFinish={handleFinish}>
					<Form.Item name="title" label="标题">
						<Input placeholder="请输入标题" />
					</Form.Item>
					<Form.Item name="subTitle" label="副标题">
						<Input.TextArea placeholder="请输入副标题" />
					</Form.Item>
					<Form.Item name="href" label="超链接">
						<Input placeholder="请输入超链接地址" />
					</Form.Item>
					<Form.Item name="image" label="Banner图片上传" rules={[{required: true, message: '请上传Banner图片'}]}>
						<Upload
							listType="picture-card"
							className={css.bannerUploader}
							onPreview={handlePreview}
							fileList={fileList}
							onRemove={() => {
								setFileList([]);
							}}
							beforeUpload={(file, fileList) => {
								setFileList(fileList);
							}}
						>
							{fileList?.length >= 1
								? null
								: uploadButton}
						</Upload>
					</Form.Item>
					{previewImage && (
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
				</Form>
			)}
		</Container>
	);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
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
	Button,
	Result,
	Flex,
} from 'antd';
import css from './index.module.less';
import Container from '@/components/Container';
import { ISelectedBanner } from '../..';
import { IMAGE_PREFIX } from '@/constant';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const titleMapping: any = {
	new: '新增Banner',
	edit: '编辑Banner',
};
interface BannerFormProps {
    onCancel?: () => void;
    adding?: boolean;
    selected: ISelectedBanner | null;
    addBanner?: any;
    deleteBanner?: any;
    disableBanner?: any;
    enabledBanner?: any;
    updateBanner?: any;
}
export default function BannerForm(props: BannerFormProps) {
	const {
		onCancel,
		selected,
		adding,
		addBanner,
		deleteBanner,
		enabledBanner,
		disableBanner,
		updateBanner,
	} = props;
	const [previewOpen, setPreviewOpen] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [fileList, setFileList] = useState<any>([]);
	const [form] = Form.useForm();

	const isNullSelected = !selected;

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			<PlusOutlined
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
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

	const handleFinish = (values: any) => {
		const { image, ...submitValues } = values;
		if (selected?.type === 'new') {
			addBanner({
				...submitValues,
				url: imageUrl,
				status: '1',
			});
		} else if (selected?.type === 'edit') {
			updateBanner({
				...submitValues,
				url: imageUrl,
				status: selected?.status,
				id: selected?.id
			});
		}
	};


	const DetailTitle = ({ type }: { type: 'new' | 'edit' }) => {
		return (
			<span >{titleMapping[type]}</span>
		);
	};

	const DetailExtra = ({ type }: { type: 'new' | 'edit' }) => {
		return (
			<Space>
				<Button type="primary" onClick={form.submit}>
                    保存
				</Button>
				<Button onClick={onCancel}>取消</Button>
			</Space>
		);
	};

	useEffect(() => {
		if (selected && selected.type === 'edit') {
			form.setFieldsValue({
				title: selected?.title,
				subtitle: selected?.subtitle,
				link: selected?.link,
				url: selected?.url
			});
			setImageUrl(selected?.url || '');
			setFileList([{ uid: '-1', url: selected?.url }]);
		} else if (selected && selected?.type === 'new') {
			form.resetFields();
			setImageUrl('');
			setFileList([]);
		}
	}, [selected]);

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

	return (
		<Container
			spinning={adding}
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
				<Form
					layout="vertical"
					form={form}
					onFinish={handleFinish}
					disabled={adding}
				>
					<Form.Item name="title" label="标题">
						<Input placeholder="请输入标题" />
					</Form.Item>
					<Form.Item name="subtitle" label="副标题">
						<Input.TextArea placeholder="请输入副标题" />
					</Form.Item>
					<Form.Item name="link" label="超链接">
						<Input placeholder="请输入超链接地址" />
					</Form.Item>
					<Form.Item
						name="url"
						label="Banner图片上传"
						rules={[
							{ required: true, message: '请上传Banner图片' },
						]}
					>
						<Upload
							disabled={uploading}
							listType="picture-card"
							action={'/official-website/upload/uploadFile'}
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

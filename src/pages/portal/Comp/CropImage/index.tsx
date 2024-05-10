import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {  message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import PageContainer from '@/components/PageContainer';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
import CropModal from './CropModal';

const getBase64 = (img: FileType, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

const App: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();
	const [croppedImageUrl, setCroppedImageUrl] = useState<string>();
	const [cropModalOpen, setCropModalOpen] = useState<boolean>(false);

	const handleChange: UploadProps['onChange'] = (info) => {
		console.log({info});
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as FileType, (url) => {
				setLoading(false);
				setImageUrl(url);
				setCropModalOpen(true);
			});
		}
	};

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	return (
		<PageContainer>
			<Upload
				name="cropped-image"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				beforeUpload={beforeUpload}
				onChange={handleChange}
			>
				{croppedImageUrl ? <img src={croppedImageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
			</Upload>
			{croppedImageUrl ? <img src={croppedImageUrl} alt="avatar" style={{ height: '40px' }} /> : uploadButton}
			<CropModal 
				open={cropModalOpen} 
				imageSrc={imageUrl}
				onCancel={() => {
					setCropModalOpen(false);
				}}
				afterCrop={(file, datUrl) => {
					setCroppedImageUrl(datUrl);
				}}
			/>
		</PageContainer>
	);
};

export default App;
import PageContainer from '@/components/PageContainer';
import React, {  useEffect, useRef, useState } from 'react';
import { Button, Card, Flex, Space, Upload, Divider, Form, Slider } from 'antd';
import { IOperationData, getRenderSize, handleFilter } from '@/utils/imageEditor';

const BASIC_CONFIG = {light: 0, sharpen: 0};
export default function ImageEditor() {
	const [uploadImage, setUploadImage] = useState<HTMLImageElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const canvasPreRef = useRef<HTMLCanvasElement | null>(null);
	const [canvasImageSize, setCanvasImageSize] = useState<any>({});
	const [originImage, setOriginImage] = useState<any>({});
	const [filterConfig, setFilterConfig] = useState<IOperationData>(BASIC_CONFIG);
	const [startFilter, setStartFilter] = useState<boolean>(false);
	const [form] = Form.useForm();
	const handleUpload =async ({file}:any) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const {width, height} = image;
		setUploadImage(uploadImage);
		if (!canvasRef.current || !canvasPreRef.current)  return;
		const ctx = canvasRef.current.getContext('2d');
		const ctxPre = canvasPreRef.current.getContext('2d');
		const {width: _width , height: _height} = getRenderSize(width, height, 400);
		ctx?.drawImage(image, 0,0, _width, _height);
		ctxPre?.drawImage(image, 0,0, _width, _height);
		setCanvasImageSize({width: _width, height:_height });
		setOriginImage(src);
	};

	const handleFormChange = (_:any, allValues:IOperationData) => {
		setStartFilter(true);
		setFilterConfig(allValues);
	};

	const handleDownload = () => {
		const downloadCanvas = document.createElement('canvas');
		const image = new Image();
		image.src = originImage;
		const {width, height} = image;
		downloadCanvas.width = width;
		downloadCanvas.height = height;
		handleFilter(canvasPreRef.current,downloadCanvas, filterConfig , canvasImageSize);
		const base64Img = downloadCanvas.toDataURL('image/jpg');
		const a = document.createElement('a'); // 生成一个a元素
		const event = new MouseEvent('click'); // 创建一个单击事件
		a.download = 'test.jpg'; // 设置图片名称
		a.href = base64Img; // 将生成的URL设置为a.href属性
		a.dispatchEvent(event);
	};

	useEffect(() => {
		if(startFilter) {
			handleFilter(canvasPreRef.current,canvasRef.current, filterConfig , canvasImageSize);
		}
	}, [filterConfig, startFilter]);

	return (
		<PageContainer>
			<Flex gap={24} style={{ height: '100%' }}>
				<Card title="原始图像" style={{ flex: 1 }} extra={(
					<Space>
						<Button onClick={handleDownload}>Download</Button>
					</Space>
				)}>
					<canvas ref={canvasPreRef}  width={400} height={400}></canvas>
					<h1>处理后图像</h1>
					<canvas ref={canvasRef}  width={400} height={400}></canvas>
				</Card>
				<Card title="处理" style={{ flex: 1 }}>
					<Upload
						showUploadList={false}
						listType={'picture-card'}
						onChange={(e) => handleUpload(e)}
					>
						Upload
					</Upload>
					<Divider/>
					<Form layout='vertical' form={form} onValuesChange={handleFormChange} initialValues={filterConfig}>
						<Form.Item label="亮度" name={'light'}>
							<Slider  min={-50} max={50} 
							/>
						</Form.Item>
						<Form.Item label="锐化" name="sharpen">
							<Slider min={0} max={20}
							/>
						</Form.Item>
					</Form>
				</Card>
			</Flex>
		</PageContainer>
	);
}

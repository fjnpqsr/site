import PageContainer from '@/components/PageContainer';
import React, {  useEffect, useRef, useState } from 'react';
import { Button, Card, Flex, Space, Upload, Divider, Form, Slider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getRenderSize, changeImageLight, sharpenImage } from '@/utils/imageEditor';
import {debounce} from 'lodash-es';

export default function ImageEditor() {

	const [uploadImage, setUploadImage] = useState<HTMLImageElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const canvasPreRef = useRef<HTMLCanvasElement | null>(null);
	const [light, setLight] = useState<number>(0);
	const [kernel , setKernel ] = useState<number>(0);
	const [canvasImageSize, setCanvasImageSize] = useState<any>({});
	const [originImageData, setOriginImageData] = useState<any>({});

	const handleUpload =async ({file}:any) => {
		// read image file
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
		//  set canvas size 
		// canvasRef.current.width = width;
		// canvasRef.current.height = height;
		const {width: _width , height: _height} = getRenderSize(width, height, 400);
		ctx?.drawImage(image, 0,0, _width, _height);
		ctxPre?.drawImage(image, 0,0, _width, _height);
		const preImageData = ctxPre?.getImageData(0,0, _width, _height);
		console.log({preImageData});
		setOriginImageData(preImageData);
		setCanvasImageSize({width: _width, height:_height });
		setLight(0);
	};
	useEffect(() => {
	
	}, []);

	return (
		<PageContainer>
			<Flex gap={24} style={{ height: '100%' }}>
				<Card title="原始图像" style={{ flex: 1 }} extra={(
					<Space>
						<Button >Clear</Button>
					</Space>
				)}>
					<canvas ref={canvasPreRef}  width={400} height={400}></canvas>
					<h1>处理啊后图像</h1>
					<canvas ref={canvasRef}  width={400} height={400}></canvas>
				</Card>
				<Card title="处理" style={{ flex: 1 }}>
					<Upload
						showUploadList={false}
						listType={'picture-card'}
						onChange={(e) => handleUpload(e)}
					>
						<UploadOutlined />Upload
					</Upload>
					<Divider/>
					<Form layout='vertical'>
						<Form.Item label="亮度">
							<Slider value={light} min={-50} max={50} onChange={debounce((val:number)=> {
								setLight(val);
								changeImageLight(canvasRef.current, val - light, originImageData);
							}, 100)}/>
						</Form.Item>
						<Form.Item label="锐化">
							<Slider value={kernel} min={0} max={20} onChange={debounce((val:number)=> {
								setKernel(val);
								sharpenImage(canvasPreRef.current,canvasRef.current, val , canvasImageSize);
							}, 100)}/>
						</Form.Item>
					</Form>
				</Card>
			</Flex>
		</PageContainer>
	);
}

import React, { useEffect, useRef, useState } from 'react';
import {Modal} from 'antd';
import Cropper from 'cropperjs';

const CropModal = (props:any) => {
	const {imageSrc, open, onCancel, afterCrop} = props;
	const imgRef = useRef<HTMLImageElement>(null);
	const [cropperInstance, setCropperInstance] = useState<any>({});


	const initCropCanvas = () => {
		if (!imgRef.current) return; 
		const cropper = new Cropper(imgRef.current, {
			initialAspectRatio: 16 / 9,
			viewMode: 1,
			dragMode: 'move',
		});
		setCropperInstance(cropper);
	};
	function dataURLtoFile(dataurl: string, filename: string) {
		// 获取到base64编码
		const arr = dataurl.split(',');
		// 将base64编码转为字符串
		const bstr = window.atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n); // 创建初始化为0的，包含length个元素的无符号整型数组
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {
			type: 'image/jpeg',
		});
	}
      

	return (
		<Modal
			open={open}
			onCancel={onCancel}
			destroyOnClose
			title="Cropping Image"
			maskClosable={false}
			onOk={() => {
				const canvas = cropperInstance?.getCroppedCanvas();
				const dataUrl = canvas.toDataURL('image/png');
				const file = dataURLtoFile(dataUrl, 'test.png');
				console.log({file});
				if (afterCrop) {
					afterCrop(file, dataUrl);
				}
				onCancel && onCancel();
			}}
		>
			<div style={{height: 360, borderRadius: 6, overflow: 'hidden'}}>
				<img 
					ref={imgRef} src={imageSrc} alt="" style={{width: '100%'}}
					onLoad={initCropCanvas}
				/>
			</div>
		</Modal>
	);
};

export default CropModal;
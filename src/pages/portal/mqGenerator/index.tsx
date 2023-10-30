/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-12-21 15:28:37
 * @LastEditTime: 2023-05-26 10:17:26
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\portal\mqGenerator\index.tsx
 */
import PageContainer from '@/components/PageContainer';
import { Button, DatePicker, Form, Input, Segmented } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import {vehicleMQMock} from './demo';
import './index.less';

const FormItem = Form.Item;
const MqGenerator = () => {
	const [form] = Form.useForm();
	const [mode, setMode] = useState<'Face' | 'Vehicle' | 'Behavior'>('Vehicle');
	const [jsonData, setJsonData] = useState<any>({}); 
	const segmentOptions = ['Face', 'Vehicle', 'Behavior'];

	const vehicleForm = (
		<>
			<FormItem
				label="CameraId"
				name="cameraId"
				rules={[{ required: true, message: ' ' }, { whitespace: true }]}
			>
				<Input />
			</FormItem>
			<FormItem
				label="Timestamp & EntryTime"
				name="timestamp"
				rules={[{ required: true, message: ' ' }]}
			>
				<DatePicker showTime style={{ width: '100%' }} />
			</FormItem>
			<FormItem
				label="BK-ID"
				name="bkId"
				rules={[{ required: true, message: ' ' }, { whitespace: true }]}
			>
				<Input />
			</FormItem>
			<FormItem
				label="OBJECT-ID"
				name="objectId"
				rules={[{ required: true, message: ' ' }, { whitespace: true }]}
			>
				<Input />
			</FormItem>
			<FormItem
				label="TASK-ID"
				name="taskId"
				rules={[{ required: true, message: ' ' }, { whitespace: true }]}
			>
				<Input />
			</FormItem>
			<FormItem
				label="Plate Number"
				name="plateNumber"
				help='PlateClass: private_car'
				rules={[{ required: true, message: ' ' }, { whitespace: true }]}
			>
				<Input />
			</FormItem>
		</>
	);

	const handleGenerate = (values: any) => {
		const {timestamp, bkId, taskId, objectId, cameraId, plateNumber} = values;
		setJsonData({
			...vehicleMQMock,
			objectId,
			taskId,
			bkid: bkId,
			target: {
				...vehicleMQMock.target,
				cameraId,
				entryTime: timestamp.valueOf(),
				timestamp: timestamp.valueOf(),
				objId: `${cameraId}#${timestamp.valueOf()}`,
				RecordID: `${cameraId}#${timestamp.valueOf()}`,
				PlateNo: plateNumber
			},
   
		});
	};

	useEffect(() => {
		form.resetFields();
	}, [mode]);

	return (
		<PageContainer>
			<div className="mq-generator">
				<div className="params">
					<Segmented
						block
						value={mode}
						style={{ marginBottom: 12 }}
						options={segmentOptions}
						onChange={(value: any) => {
							setMode(value);
						}}
					/>
					<Form layout="vertical" onFinish={handleGenerate} form={form}>
						{mode === 'Vehicle' && vehicleForm}
					</Form>
					<Button
						block
						type="primary"
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							bottom: 0,
						}}
						onClick={() => {
							form.submit();
						}}
					>
                        Generate
					</Button>
				</div>
				<div className="result">
					<ReactJson 
						src={jsonData} 
						collapseStringsAfterLength={20}
						theme={'ocean'}
						displayDataTypes={false}
						style={{
							overflow: 'scroll',
							height: '100%',
							padding: '12px'
						}}
					/>
				</div>
			</div>
		</PageContainer>
	);
};

export default MqGenerator;

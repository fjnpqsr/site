import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';

const TargetVehicleTrackTable = (props: any) => {
	const { data = [], dataSource, setDataSource } = props;
	const [accompanyForm] = Form.useForm();

	const [addAccompanyVehicleModal, setAddAccompanyVehicleModal] = useState<any>(false);
	const [targetCamera, setTargetCamera] = useState<any>();


	useEffect(() => {
		if (data.plateNo) {
			const formattedDataSource = data?.track.map((item: any) => ({
				...item,
				plateNo: data.plateNo,
				children: []
			}));
			setDataSource(formattedDataSource);
		} else {
			setDataSource([]);
		}
	}, [data]);

	const handleAdd = (item: any, index: any) => {
		setTargetCamera(index);
		setAddAccompanyVehicleModal(true);
	};

	const handleAddAccompanyVehicle = () => {
		accompanyForm.validateFields().then((values) => {
			console.log({values});
			const newDataSource = [...dataSource];
			const targetCameraPoint = newDataSource.filter((item:any, index:any) => index === targetCamera )[0];
			console.log({targetCameraPoint});
			targetCameraPoint.children.push({...values, cameraId: targetCameraPoint.cameraId});
			setDataSource(newDataSource);
			setAddAccompanyVehicleModal(false);
		});
	};
	return (
		<div>
			<div>
				<p>目标车辆信息: </p>
				<p>Plate Number: {data.plateNo}</p>
			</div>
			<div>
				<Row gutter={12}>
					{dataSource.map((item: any, index: number) => (
						<Col span={6} key={item.cameraId}>
							<Card
								size="small"
								title={item.cameraId}
								extra={
									<PlusCircleOutlined
										onClick={() => {
											handleAdd(item, index);
										}}
									/>
								}
							>
								<p>伴随车辆: </p>
								<div >
									{item.children.map((item:any) => (
										<div 
											key={item.plateNo}
											style={{
												border: '1px solid #dedede', 
												padding: 12,
												marginBottom: 8
											}}
										>
											<div>Plate Number: {item.plateNum}</div>
											<div>CapturedTime: {item.capturedTime}</div>
											<div>Image: {item.image}</div>
										</div>
									))}
								</div>
							</Card>
						</Col>
					))}
				</Row>
			</div>
			<Modal 
				title='Add Accompany Vehicle info'
				open={addAccompanyVehicleModal}    
				onCancel={() => {
					setAddAccompanyVehicleModal(false);
				}}
				onOk={handleAddAccompanyVehicle}
				afterClose={() => {
					accompanyForm.resetFields();
				}}
			>
				<Form form={accompanyForm} layout='vertical'>
					<Form.Item 
						label ='Plate Number'
						name={'plateNum'}
						rules={[
							{required: true},
							{whitespace: true}
						]}
					>
						<Input placeholder='Plate Number'/>
					</Form.Item>
					<Form.Item 
						label ='CapturedTime'
						name='capturedTime'
						rules={[
							{required: true},
							{whitespace: true}
						]}
					>
						<Input placeholder='CapturedTime'/>
					</Form.Item>
					<Form.Item 
						label ='Image'
						name='image'
						rules={[
							{required: true},
							{whitespace: true}
						]}
					>
						<Input placeholder='Image'/>
					</Form.Item>

				</Form>
			</Modal>
		</div>
	);
};

export default TargetVehicleTrackTable;

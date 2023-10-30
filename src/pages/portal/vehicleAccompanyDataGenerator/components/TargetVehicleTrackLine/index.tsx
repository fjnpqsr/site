/*
 * @Author: Qiu Shao Rong
 * @Date: 2023-04-20 11:40:53
 * @LastEditTime: 2023-04-20 13:39:48
 * @LastEditors: Qiu Shao Rong
 * @Description: 
 * @FilePath: \front-end\src\pages\portal\vehicleAccompanyDataGenerator\components\TargetVehicleTrackLine\index.tsx
 */
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Space } from 'antd';
import React from 'react';

const TargetVehicleTrackLine = (props: any) => {
	return (
		<Form
			form={props.form}
			initialValues={{ plateNo: '', track: [{}] }}
			layout="vertical"
			onValuesChange={(changedValue, allValue) => {
				console.log(changedValue, allValue);
			}}
		>
			<Form.Item
				label="Plate Number"
				name="plateNo"
				rules={[{ required: true }]}
			>
				<Input placeholder='plate number'/>
			</Form.Item>
			<Form.Item label="Track Line Point">
				<Form.List name="track">
					{(fields, { add, remove }) => {
						return (
							<div className="fields-wrapper">
								{fields.map((field) => {
									return (
										<Row gutter={12} key={field.name}>
											<Col span={6}>
												<Form.Item
													name={[ field.name, 'cameraId',]}
													rules={[
														{required: true},
														{whitespace: true}
													]}
												>
													<Input placeholder="cameraId" />
												</Form.Item>
											</Col>
											<Col span={6}>
												<Form.Item
													name={[field.name, 'time']}
													rules={[
														{required: true},
														{whitespace: true}
													]}
												>
													<Input placeholder="time" />
												</Form.Item>
											</Col>
											<Col span={6}>
												<Form.Item
													name={[field.name, 'image']}
													rules={[
														{required: true},
														{whitespace: true}
													]}
												>
													<Input placeholder="image" />
												</Form.Item>
											</Col>
											<Col span={6}>
												<Space
													align="center"
													style={{
														height: 32,
														padding: '0 8px',
													}}
												>
													{fields.length > 1 && (
														<MinusCircleOutlined
															onClick={() => {
																remove(
																	field.name
																);
															}}
														/>
													)}
													<PlusCircleOutlined
														onClick={() => {
															add({});
														}}
													/>
												</Space>
											</Col>
										</Row>
									);
								})}
							</div>
						);
					}}
				</Form.List>
			</Form.Item>
		</Form>
	);
};

export default TargetVehicleTrackLine;

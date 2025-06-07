import React, { useContext } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import {history} from 'umi';
import request from 'umi-request';
import { context } from '@/context/context';

type FieldType = {
    account?: string;
    password?: string;
};


const App: React.FC = () => {
	const {  updateContext } = useContext(context);
	async function login(values: FieldType) {
		const { code, msg, data } = await request('/api/login', {
			method: 'post',
			data: {
				account: values.account,
				password: values.password,
				ext: {},
			},
		});
		if (code === '200') {
			message.destroy();
			message.success('登录成功');
			updateContext({type: 'token', payload: data?.accessToken?.value} );
			updateContext({type: 'userInfo', payload: {username: values.account}} );
			history.push('/portal');
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
		login(values);
	};
	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item<FieldType>
				label="Username"
				name="account"
				rules={[{ required: true, message: 'Please input your username!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item<FieldType>
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item label={null}>
				<Button type="primary" htmlType="submit">
                Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default App;

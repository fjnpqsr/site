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
		const { code, msg, data } = await request('/official-website/login', {
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
			sessionStorage.setItem('token', data?.accessToken?.value);
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
			style={{ width: 300,  }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			layout='vertical'
			autoComplete="off"
			size='large'
		>
			<Form.Item<FieldType>
				label="用户名"
				name="account"
				rules={[{ required: true, message: '请输入用户名!' }]}
			>
				<Input placeholder='请输入用户名' style={{}} width={300}/>
			</Form.Item>

			<Form.Item<FieldType>
				label="密码"
				name="password"
				rules={[{ required: true, message: '请输入密码!' }]}
			>
				<Input.Password placeholder='请输入密码' width={300}/>
			</Form.Item>

			<Button type="primary" htmlType="submit" block>
                登录
			</Button>
		</Form>
	);
};

export default App;

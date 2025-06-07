import { Flex, Space } from 'antd';
import LoginForm from './LoginForm';
import React from 'react';

import landingPic from '@/assets/landing.png';
import logo from '@/assets/logo.gif';

const LoginPage = () => (
	<Flex style={{ height: '100%' }}>
		<div
			style={{ flex: 6, overflow: 'hidden', padding: 12, height: '100%' }}
		>
			<div
				style={{
					borderRadius: 12,
					overflow: 'hidden',
					height: '100%',
					backgroundImage: `url("${landingPic}")`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			></div>
		</div>
		<Flex
			flex={4}
			vertical
			style={{
				position: 'relative',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: 24
			}}
		>
			<div style={{width: '100%', textAlign: 'right'}}>
				<img
					src={logo}
					alt=""
					width={200}
					
				/>
			</div>
			
			<Flex vertical>
				<div style={{marginBottom: 50}}>
					<h1 style={{ marginBottom: '' }}>你好</h1>
					<h2>欢迎回来!</h2>
				</div>
				<LoginForm />
			</Flex>
			<Space>
				<p style={{ fontSize: '12px', lineHeight: 2, color: '#aaa' }}>
                    版权所有 © 福建聚实新能源科技有限公司
                    未经许可不得复制、转载或摘编，违者必究!
					<br />
                    Copyright ©Fujian Jushi New Energy Technology Co. , Ltd.
                    闽ICP备2024028281号-1
				</p>
			</Space>
		</Flex>
	</Flex>
);

export default LoginPage;

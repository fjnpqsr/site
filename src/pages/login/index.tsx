import {Button} from 'antd';
import React from 'react';
import {history} from 'umi';

const LoginPage = () => (
	<div>
            Login page
		<Button
			onClick={() => {
				history.back();
			}}
		>
                back
		</Button>
	</div>
);

export default LoginPage;

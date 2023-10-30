/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 14:05:09
 * @LastEditTime: 2022-08-03 14:05:28
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\loading.tsx
 */
import {Spin} from 'antd';
import React, { CSSProperties } from 'react';

const LoadingComponent = () => {
	const loadingStyle: CSSProperties = {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	};
	return <div style={loadingStyle}><Spin /></div>;
};
export default LoadingComponent;

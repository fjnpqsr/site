import PageContainer from '@/components/PageContainer';
import { ColorPicker, Space } from 'antd';
import React from 'react';


const ColorDefine = () => {

	const groups = [
		{
			label: '主题色',
			colors: [
				{ color: '#2684C2', desc: '主题色-蓝' },
				{ color: '#86bb47', desc: '主题色-绿' },
				{ color: '#faad14', desc: '功能色-warning' },
				{ color: '#389e0d', desc: '功能色-success' },
				{ color: '#096dd9', desc: '功能色-info' },
				{ color: '#d93026', desc: '功能色-error' },
			]
		},
		{
			label: '背景色',
			colors: [
				{ color: '#fff', desc: '背景色' },
				{ color: '#f0f2f5', desc: 'forgetPassword背景色' },
				{ color: '#f5f5f5', desc: '背景色' },
			]
		},
		{
			label: '字体色',
			colors: [
				{ color: '#000000d9', desc: '字体颜色' },
				{ color: '#fff', desc: '字体色' },
			]
		},
		{
			label: '边框色',
			colors: [
				{ color: '#d9d9d9', desc: '边框颜色' },
				{ color: '#dedede', desc: '边框颜色1' },
				{ color: '#ccc', desc: '边框颜色2' },
				{ color: '#2684C2', desc: '边框颜色3' },
				{ color: '#C1C6CA', desc: '边框颜色4' },
				{ color: '#cdcdcd', desc: '边框颜色5' },
				{ color: '#0000000f', desc: '边框颜色6' },
				{ color: '#87bc54', desc: '边框颜色7' },
				{ color: '#e3e3e3', desc: '边框颜色8' },
				{ color: '#f5f5f5', desc: '边框颜色9' },
				{ color: '#D93026', desc: '蓝图边框颜色1' },
				{ color: '#FAAD14', desc: '蓝图边框颜色2' },
				{ color: '#389E0D', desc: '蓝图边框颜色3' },
				{ color: '#2684C2', desc: '蓝图边框颜色4' },
				{ color: '#1890FF', desc: '蓝图边框颜色5' },
				{ color: '#239edd', desc: '蓝图边框颜色6' },
				{ color: '#113B57', desc: '蓝图边框颜色7' },
			]
		},
	];

	return (
		<PageContainer>
			{groups.map(item => (
				<div key={item.label}>
					<p>{item.label}</p>
					<Space wrap>
						{
							item.colors.map((item: { color: string, desc: string }) => (
								<div key={item.color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
									<div>
										<ColorPicker value={item.color} showText />
									</div>
									<p>{item.desc}</p>
								</div>
							))
						}
					</Space>
				</div>
			))}
			
		</PageContainer>
	);
};

export default ColorDefine;
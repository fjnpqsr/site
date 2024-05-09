import PageContainer from '@/components/PageContainer';
import { ColorPicker, Space, Collapse, theme } from 'antd';
import React from 'react';
import { groups } from './data';



const ColorDefine = () => {
	const { token } = theme.useToken();

	const panelStyle: React.CSSProperties = {
		marginBottom: 24,
		background: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		border: 'none',
	};

	const items = groups.map(item => {
		const children = 	<Space wrap direction='vertical'style={{width: '100%'}}>
			{
				item.colors.map((item: { color: string, desc: string }) => (
					<div 
						key={item.color} 
						style={{ display: 'flex',  alignItems: 'center', justifyContent:'space-between' }}
					>
						<ColorPicker value={item.color} showText />
						<p>{item.desc}</p>
					</div>
				))
			}
		</Space>;
		return {
			key: item.label,
			label: item.label,
			children,
			style: panelStyle
		};
	});

	return (
		<PageContainer>
			<Collapse 
				items={items}
				bordered={false}
				defaultActiveKey={groups.map(item => item.label)}
				style={{ background: token.colorBgContainer }}
			/>
		</PageContainer>
	);
};

export default ColorDefine;
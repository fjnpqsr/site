import { Card, Spin, theme } from 'antd';
import { CardProps } from 'antd/lib';
import React from 'react';
import css from './index.module.less';
interface ContainerProps extends CardProps {
    spinning?: boolean;
}

export default function Container(props: ContainerProps) {
	const {
		token: { colorBgContainer, colorText },
	} = theme.useToken();
	const { style, spinning = false, ...restProps } = props;
	return (
		<Card
			{...restProps}
			bodyStyle={{ flex: 1 }}
			style={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: colorBgContainer,
				height: '100%',
				color: colorText,
				overflowX: 'hidden',
				borderRadius: 8,
				...style,
			}}
		>
			<Spin
				spinning={spinning}
				wrapperClassName={css.containerSpin}
				style={{
					height: '100%',
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{props.children}
			</Spin>
		</Card>
	);
}

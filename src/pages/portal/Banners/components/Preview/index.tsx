import { Carousel, theme } from 'antd';
import React from 'react';
import css from './index.module.less';
import { IBanner } from '../../hooks/useBanner';
import browserTopLine from '@/assets/browser-top.png';

interface IBannerPreviewProps {
    data: IBanner[];
}
export default function BannerPreview(props: IBannerPreviewProps) {
	const {
		token: { colorBorder, boxShadow },
	} = theme.useToken();
	const { data } = props;
	const contentStyle: React.CSSProperties = {
		margin: 0,
		color: '#fff',
		height: '100%',
		textAlign: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		position: 'relative',
	};
	console.log({ colorBorder });
	const containerStyle: React.CSSProperties = {
		width: '70%',
		minWidth: 400,
		borderColor: colorBorder,
		borderRadius: 8,
		overflow: 'hidden',
		borderWidth: 1,
		borderStyle: 'solid',
		boxShadow: boxShadow,
		aspectRatio: 400 / 245,
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
	};
	return (
		<div style={containerStyle}>
			<img
				src={browserTopLine}
				width={'100%'}
				style={{ minWidth: 400 }}
			/>

			<div style={{ flex: 1 }}>
				<Carousel
					arrows={data?.length > 1}
					infinite
					className={css.bannerPreview}
				>
					{data.map((item) => (
						<div key={item.id} style={{ height: '100%' }}>
							<h3
								style={{
									...contentStyle,
									backgroundImage: `url(${item.url})`,
								}}
							>
								<dl
									style={{
										position: 'absolute',
										left: 12,
										bottom: 12,
										zIndex: 10,
										textAlign: 'left',
										marginBottom: 0,
									}}
								>
									<dt style={{ fontSize: 12 }}>
										{item.title}
									</dt>
									<dd
										style={{
											fontSize: 10,
											color: 'lightgray',
										}}
									>
										{item.subtitle}
									</dd>
								</dl>
							</h3>
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
}

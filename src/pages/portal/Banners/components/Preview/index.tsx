import { Carousel } from 'antd';
import React from 'react';
import css from './index.module.less';

export default function BannerPreview() {

	const contentStyle: React.CSSProperties = {
		margin: 0,
		height: '400',
		color: '#fff',
		lineHeight: '225px',
		textAlign: 'center',
		background: '#364d79',
	};
	return (
		<div style={{width: '100%'}}>
			<Carousel arrows infinite  className={css.bannerPreview}>
				<div>
					<h3 style={contentStyle}>1</h3>
				</div>
				<div>
					<h3 style={contentStyle}>2</h3>
				</div>
				<div>
					<h3 style={contentStyle}>3</h3>
				</div>
				<div>
					<h3 style={contentStyle}>4</h3>
				</div>
			</Carousel>
		</div>
	);
}

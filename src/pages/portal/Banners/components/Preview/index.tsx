import { Carousel } from 'antd';
import React from 'react';
import css from './index.module.less';
import { IBanner } from '../../hooks/useBannerList';


interface IBannerPreviewProps {
	data: IBanner[];
}
export default function BannerPreview(props: IBannerPreviewProps) {
	const {data}= props;
	const contentStyle: React.CSSProperties = {
		margin: 0,
		color: '#fff',
		height: '225px',
		textAlign: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		position: 'relative'
	};


	return (
		<div style={{width: '100%', height: 225}}>
			<Carousel arrows infinite  className={css.bannerPreview}>
			
				{data.map(item => (
					<div key={item.id} >
						<h3 style={{...contentStyle, backgroundImage: `url(${item.image})`}}>
							{' '}
							<dl style={{position: 'absolute', left: 12, bottom: 12, zIndex: 10, textAlign: 'left', marginBottom: 0}}>
								<dt style={{fontSize: 12}}>{item.title}</dt>
								<dd style={{fontSize: 10, color: 'lightgray'}}>{item.subTitle}</dd>
							</dl>
						</h3>
					
					</div>
				))}
			</Carousel>
		</div>
	);
}

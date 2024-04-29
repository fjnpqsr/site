import css from './index.less';
import PageContainer from '@/components/PageContainer';
import BackGrid from './BackGrid';
import React from 'react';
export default function BackPack() {
	return (
		<PageContainer>
			<div className={css.container}>
				<div className={css.back}>
					<BackGrid />
				</div>
				<div className={css.places}>
					<div className={css.shop}>shop</div>
					<div className={css.bin}>bin</div>
				</div>
			</div>
		</PageContainer>
	);
}

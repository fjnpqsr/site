import React from 'react';
import PageContainer from '@/components/PageContainer';
import LazyLoadList from '@/components/LazyLoadContainer';
import css from './index.module.less';
import loading from '@/assets/loading.svg';

const VirtualListPage = () => {
	return (
		<PageContainer>
			<LazyLoadList className={css.list}>
				<div>
					<img 
						data-src='https://picx.zhimg.com/70/v2-1ba30df33e530b3087b133f8d6793cab_1440w.avis?source=172ae18b&biz_tag=Post'
						src={loading}
					/>
				</div>
				<div>
					<img data-src="https://pic4.zhimg.com/80/v2-b0490a6797c55f2b8fe57cfa30c14d93_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic2.zhimg.com/80/v2-a8821a1fd4af4b7691d9cce3511615b5_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic2.zhimg.com/80/v2-7d516086db41c611d8dff1741c371afd_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic2.zhimg.com/80/v2-7d516086db41c611d8dff1741c371afd_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic2.zhimg.com/80/v2-7d516086db41c611d8dff1741c371afd_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic2.zhimg.com/80/v2-7d516086db41c611d8dff1741c371afd_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic1.zhimg.com/80/v2-5c2538db2a681bba8888b417e8a536ec_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic3.zhimg.com/80/v2-46e8a310ff5009b1616d1fc929d5548e_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic1.zhimg.com/80/v2-375d0db863ac7fded8c2c850e22849a0_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic4.zhimg.com/80/v2-348d6cbd48a045811cd5915aea361b37_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic4.zhimg.com/80/v2-30ee9b751ee8cad75d53c4197c8affc7_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic4.zhimg.com/80/v2-702e643736ff6c15281f983bed99431f_720w.webp" src={loading} />
				</div>
				<div>
					<img data-src="https://pic4.zhimg.com/80/v2-27e99b833713839002600ea2ac0513df_720w.webp" src={loading} />
				</div>
				{/* <Image data-src='https://pic1.zhimg.com/80/v2-fa7fcfcea184a91805102627d3284b84_720w.webp'/> */}
			</LazyLoadList>
		</PageContainer>
	);
};

export default VirtualListPage;


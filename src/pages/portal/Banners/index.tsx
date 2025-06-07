import React from 'react';
import Container from '@/components/Container';
import PageContainer from '@/components/PageContainer';
import { Button, Divider, Flex,  } from 'antd';
import BannerPreview from './components/Preview';
import BannerForm from './components/BannerForm';
import BannerList from './components/List';
import useBanner, { IBanner } from './hooks/useBanner';

export interface ISelectedBanner extends IBanner {
	type: 'new' | 'edit'
}

export default function BannersPage() {
	const {
		loading,
		banners, 
		adding, 
		selected, 
		setSelected, 
		addBanner, 
		deleteBanner,
		enabledBanner,
		disableBanner,
		updateBanner
	} = useBanner();

	return (
		<PageContainer padding={false} transparent>
			<Flex
				flex={1}
				justify="space-between"
				style={{ height: '100%' }}
				gap="middle"
			>
				<Container
					style={{ minWidth: 448, overflowY: 'auto' }}
					title={'Banner 列表'}
					extra={(
						<Button type="primary" onClick={() => {setSelected({type: 'new'});}}>新增</Button>
					)}
				>
					<Flex style={{ height: '100%' }} vertical>
						<BannerPreview data={banners.filter(item => item.status === '1')}/>
						<Divider  />
						<BannerList 
							data={banners}
							selected={selected} onClick={setSelected} loading={loading}/>
					</Flex>
				</Container>
				<BannerForm 
					selected={selected}
					addBanner={addBanner}
					deleteBanner={deleteBanner}
					enabledBanner={enabledBanner}
					disableBanner={disableBanner}
					updateBanner={updateBanner}
					adding={adding}
					onCancel={() => {
						setSelected(null);
					}}
				/>	
			</Flex>
		</PageContainer>
	);
}

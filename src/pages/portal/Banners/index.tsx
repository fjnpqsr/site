import React, { useState } from 'react';
import Container from '@/components/Container';
import PageContainer from '@/components/PageContainer';
import { Button, Divider, Flex,  } from 'antd';
import BannerPreview from './components/Preview';
import BannerForm from './components/BannerForm';
import BannerList from './components/List';
import userBannerList, { IBanner } from './hooks/useBannerList';

export interface ISelectedBanner extends IBanner {
	type: 'new' | 'edit'
}

export default function BannersPage() {
	const [selected, setSelected] = useState<ISelectedBanner|null>(null);
	const {loading, banners} = userBannerList();

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
						<Button onClick={() => {setSelected({type: 'new'});}}>新增</Button>
					)}
				>
					<Flex style={{ height: '100%' }} vertical>
						<BannerPreview data={banners}/>
						<Divider  />
						<BannerList 
							data={banners}
							selected={selected} onClick={setSelected} loading={loading}/>
					</Flex>
				</Container>
				<BannerForm 
					selected={selected}
					onCancel={() => {
						setSelected(null);
					}}
				/>	
			</Flex>
		</PageContainer>
	);
}

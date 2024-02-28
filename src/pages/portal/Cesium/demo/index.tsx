import React from 'react';
import PageContainer from '@/components/PageContainer';
import CesiumMap from '@/pages/portal/Cesium/components';

const CesiumDemo  = () => {
	return (
		<PageContainer>
			<CesiumMap />
		</PageContainer>
	);
};

export default CesiumDemo;
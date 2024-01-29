import PageContainer from '@/components/PageContainer';
import React from 'react';


const AmisIFrame = () => {
	return (
		<PageContainer   >
			<iframe src={'/aimsPages/frame.html'} style={{width: '100%', height: '90%', border: 'none'}} />
		</PageContainer>
	);
};

export default AmisIFrame;
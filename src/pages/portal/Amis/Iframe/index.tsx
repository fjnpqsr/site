import PageContainer from '@/components/PageContainer';
import React from 'react';


const AmisIFrame = () => {
	return (
		<PageContainer   >
			<iframe src={'/aimsPages/frame.html'} style={{width: '100%', height: 'calc(100% - 40px)', border: 'none', padding: 0, overflow: 'hidden'}} />
		</PageContainer>
	);
};

export default AmisIFrame;
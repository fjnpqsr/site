import React from 'react';
import PageContainer from '@/components/PageContainer';
import VirtualList from '@/components/VirtualList';


const VirtualListPage = () => {
	const bigArray = new Array(20).fill('');
	const bigData = bigArray.map((item, index) => ({label: index, key: `data-${index}`}));
    

	return (
		<PageContainer
			
		>
			<VirtualList 
				data={bigData}
				size={10}
				height={400}
				buffer={2}
			/>
		</PageContainer>
	);
};

export default VirtualListPage;

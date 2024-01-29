import React from 'react';
import PageContainer from '@/components/PageContainer';
import AmisList  from './components/AmisList';


const AmisListDemo = () => {
	return (
		<PageContainer>
			<h1>Amis list</h1>
			<AmisList/>
		</PageContainer>
	);
};

export default AmisListDemo;
import PageContainer from '@/components/PageContainer';
import STable from '@/components/STable';
import axios from 'axios';
import React from 'react';

export default function DataHubTest() {

	const columns = [{
		title: 'name',
		dataIndex: 'name'
	}];

	const testRequest = async () => {
		const response = await axios.get('/mock/test', {});
		console.log({response});
		return response.data;
	};

	return (
		<PageContainer>
			<STable
				size="small"
				pagination={false}
				columns={columns}
				request={testRequest}
			/>

		</PageContainer>
	);
}

import React from 'react';

import {Button, Space, Table} from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { copyResult } from '@/pages/portal/CCTV/i18nGenerator/utils';

const ESResult = (props: any) => {
	const {data} = props;
	const columns:any = [
		{title: 'Plate Number', dataIndex: 'plateNo'},
		{title: 'Timestamp', dataIndex: 'timestamp'},
		{title: 'CameraId', dataIndex: 'cameraId'},
		{
			title: 'Operation',
			render: (record:any) => {
				return (
					<Space>
						<Button
							onClick={() => { copyResult(JSON.stringify(record));}}
							type="primary"
							size='small'
						>
							<CopyOutlined /> Copy
						</Button>
					</Space>
				);
			}
		}
	];
	return (
		<Table 
			size='small'
			pagination={false}
			dataSource={data}
			columns={columns}
		/>
	);
};

export default ESResult;

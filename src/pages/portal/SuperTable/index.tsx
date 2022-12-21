import React from 'react';

import PageContainer from '@/components/PageContainer';
import STable from '@/components/STable';

const SuperTable = () => {
    const request = async function () {
        return {
            data: [{ name: 'sharon', key: '1', age: 19 }],
        };
    };

    const columns = [
        { title: 'name', dataIndex: 'name' },
        { title: 'age', dataIndex: 'age', hideInSearch: true },
    ];

    return (
        <PageContainer padding={false} transparent>
            <STable
                className="demo-table"
                headerTitle="表格标题"
                autoScroll
                columns={columns}
                request={request}
                rowSelection={{}}
            />
        </PageContainer>
    );
};

export default SuperTable;

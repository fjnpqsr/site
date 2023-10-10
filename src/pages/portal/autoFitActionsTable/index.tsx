import {Divider,Space, Switch, Table, Typography} from 'antd'
import React, { useState } from 'react'

import PageContainer from '@/components/PageContainer';

const AutoFitActionsTable = () => {

    const [actions, setActions] = useState(['Details', 'Renew', 'Select Tags'])

    const dataSource:any = [
        {
            id: 1, 
            name: 'name 1', 
            mobile: '00251-130000000',
            email: '345239925@iwahlecloud.com',
            createdDate: '2222-22-22 22:22:22',
            desc: 'this is some description'
        },{}
    ];

    const columns:any = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Mobile', dataIndex: 'mobile' },
        { title: 'Email', dataIndex: 'email', ellipsis: true, width: 100 },
        { title: 'Create Date', dataIndex: 'createdDate', width: 160 },
        { title: 'Create Date', dataIndex: 'createdDate', width: 160 },
        { title: 'Create Date', dataIndex: 'createdDate', width: 160 },
        { title: 'Create Date', dataIndex: 'createdDate', width: 160 },
        { title: 'Description', dataIndex: 'desc' },
        { 
            title: 'Actions', 
            fixed: 'right',
            width: 120,
            render: () => {
               return (
                    <Space split={<Divider type="vertical" style={{borderColor: 'red'}}/>}>
                        {actions.map(item => (
                            <Typography.Link key={item} style={{whiteSpace: 'nowrap'}}>{item}</Typography.Link>
                        ))}
                    </Space>
               )
            }
        },
    ]
    
    return (
        <PageContainer>
            <Switch 
                defaultChecked={true}
                onChange={(checked) => {
                    if (checked) {
                        setActions(['Details', 'Renew'])
                    } else {
                        setActions(['Details', 'Select Tags'])
                    }
                }}
            />

            <Table 
                columns={columns}
                dataSource={dataSource}
                scroll={{x: 'auto'}}
            />
        </PageContainer>
    )
}

export default AutoFitActionsTable



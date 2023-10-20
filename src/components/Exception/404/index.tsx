import { Result } from 'antd';
import React from 'react';

import PageContainer from '@/components/PageContainer';

const NotFoundPage: React.FC = () => (
    <PageContainer>
        <div style={{height: '100%', width: '100%',display: 'flex', alignItems:'center'}}>
            <Result
                status="404"
                title="404"
                style={{flex: 1}}
                subTitle="Sorry, the page you visited does not exist."
                // extra={<Button type="primary">Back Home</Button>}
            />
        </div>
  </PageContainer>
);

export default NotFoundPage;
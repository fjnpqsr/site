/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-12-21 15:28:37
 * @LastEditTime: 2023-05-10 11:17:49
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\portal\testPage\index.tsx
 */
import {history} from 'umi'

import PageContainer from '@/components/PageContainer';
const TestPage = () => {
    return (
        <PageContainer>
          <hr />
          <button 
            type='button'
            onClick={() => {
                history.go(-1)
            }}
          >back</button>
        </PageContainer>
    );
};

export default TestPage;

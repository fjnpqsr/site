/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-12-21 15:28:37
 * @LastEditTime: 2023-05-10 11:17:49
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\portal\testPage\index.tsx
 */
import PageContainer from '@/components/PageContainer';
import {Select} from 'antd'
const TestPage = () => {

    const options: any = [];

    for (let i = 0; i < 100; i++) {
      const value = `${i.toString(36)}${i}`;
      options.push({
        label: value,
        key: value,
        value,
        disabled: i === 10,
      });
    }

    return (
        <PageContainer>
          <Select 
            placeholder='10000 row testing'
            style={{width: '500px'}}
            options={options}
          />
        </PageContainer>
    );
};

export default TestPage;

/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-12-21 15:28:37
 * @LastEditTime: 2023-05-10 11:17:49
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\portal\testPage\index.tsx
 */
import {useState} from 'react'
import {history} from 'umi'

import PageContainer from '@/components/PageContainer';


const Content = () => {
  const [count, setCount] = useState(0)
  console.log({count})

  return (
   <div>
     <p>{count}</p>
    <hr />
    <button 
      type='button'
      onClick={() => {
        setCount((pre) => pre+1)
      }}
    >add</button>

    <button 
      type='button'
      onClick={() => {
        setCount((pre) => pre-1)
      }}
    >decrease</button>
    <hr />
    <button 
      type='button'
      onClick={() => {
          history?.push('/portal/testPage/detail')
      }}
    >go detail</button>
   </div>
  )
}

const TestPage = () => {
  
    return (
        <PageContainer>
          <Content/>
        </PageContainer>
    );
};

export default TestPage;

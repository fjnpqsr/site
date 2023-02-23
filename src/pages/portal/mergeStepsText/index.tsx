/*
 * @Author: Qiu Shao Rong
 * @Date: 2023-02-23 19:02:56
 * @LastEditTime: 2023-02-23 19:35:04
 * @LastEditors: Qiu Shao Rong
 * @Description: 
 * @FilePath: \front-end\src\pages\portal\mergeStepsText\index.tsx
 */
import {CopyOutlined, RedoOutlined} from '@ant-design/icons'
import { Button, Input } from 'antd';
import { useState } from 'react';

import PageContainer from '@/components/PageContainer';

import css from './index.less';

const { TextArea } = Input;

const BuildTrunkPath = () => {
    const [translateResult, setTranslateResult] = useState<string>('');
    const [steps, setSteps] = useState<string>('');
    const [excepts, setExcepts] = useState<string>('');

    function handleTransform() {
        const stepsArray = steps.split('\n')
        const exceptArray = excepts.split('\n')
        const mergedSteps = stepsArray.map((item, index) => {
            return `${index+1}. ${stepsArray[index].trim()}\n${exceptArray[index].trim()}\n`
        })
        setTranslateResult(mergedSteps.join('\n'))
    }

    function copyResult () {
        const input = document.createElement('textarea');
        input.className='copy-shadow'
        input.value=translateResult
        document.body.appendChild(input);
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
        }
        document.body.removeChild(input);
    }

    function reset () {
        setTranslateResult('')
        setSteps('')
        setExcepts('')
    }

    return (
        <PageContainer>
            <div className={css['page-build-trunk-path']}>
                <div>
                    <TextArea
                        onChange={(e) => {
                            setSteps(e.target.value);
                        }}
                        value={steps}
                        style={{ flex: 1, resize: 'none' }}
                        allowClear
                        placeholder="请输入测试步骤内容"
                    />
                    <TextArea
                        onChange={(e) => {
                            setExcepts(e.target.value);
                        }}
                        value={excepts}
                        style={{ flex: 1, marginTop: '12px', resize: 'none' }}
                        allowClear
                        placeholder="请输入期望结果内容"
                    />
                </div>
                <div className={css['result-view']}>
                    <div style={{ marginBottom: '12px', display: 'flex' }}>
                        <Button
                            type="primary"
                            style={{ marginRight: '12px', flex: 1 }}
                            onClick={handleTransform}
                        >
                            Transform
                        </Button>
                        <Button
                            style={{ marginRight: '12px' }}
                            onClick={copyResult}
                            type='text'
                            disabled={!translateResult}
                        >
                            <CopyOutlined />
                        </Button>
                        <Button
                            style={{ marginRight: '12px' }}
                            onClick={reset}
                            type='text'
                        >
                            <RedoOutlined />
                        </Button>
                    </div>
                    <pre>{translateResult}</pre>
                </div>
            </div>
        </PageContainer>
    );
};

export default BuildTrunkPath;

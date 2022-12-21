import { Button, Input } from 'antd';
import { useState } from 'react';

import PageContainer from '@/components/PageContainer';

import css from './index.less';

const { TextArea } = Input;

const BuildTrunkPath = () => {
    const [translateResult, setTranslateResult] = useState<string>('');
    const [pathValue, setPathValue] = useState<string>('');
    const [prefixValue, setPrefixValue] = useState<string>('');

    function handleTransform() {
        const paths = pathValue.split('\n');
        const result = paths
            .map((item: string) => {
                return `${prefixValue}${item.replaceAll('\\', '/')}`;
            })
            .join('\n');
        setTranslateResult(result);
    }

    return (
        <PageContainer>
            <div className={css['page-build-trunk-path']}>
                <div>
                    <Input
                        allowClear
                        placeholder="请输入trunk分支名称"
                        onChange={(e) => {
                            setPrefixValue(e.target.value);
                        }}
                        value={prefixValue}
                    />
                    <TextArea
                        onChange={(e) => {
                            setPathValue(e.target.value);
                        }}
                        value={pathValue}
                        style={{ flex: 1, marginTop: '12px', resize: 'none' }}
                        allowClear
                        placeholder="请输入文件相对路径(多条记录换行输入)"
                    />
                </div>
                <div className={css['result-view']}>
                    <Button
                        type="primary"
                        style={{ marginBottom: '12px' }}
                        onClick={handleTransform}
                    >
                        Transform
                    </Button>
                    <pre>{translateResult}</pre>
                </div>
            </div>
        </PageContainer>
    );
};

export default BuildTrunkPath;

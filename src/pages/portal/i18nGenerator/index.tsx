import './index.less';

import { CopyOutlined } from '@ant-design/icons';
import {
    Button,
    Drawer,
    Form,
    Input,
    message,
    Modal,
    Space,
    Table,
    theme,
} from 'antd';
import React, { useEffect, useState } from 'react';

import PageContainer from '@/components/PageContainer';

import I18nGeneratorForm from './components/generatorForm'
import { copyResult, formatI18nData, getCacheData, saveCacheData } from './utils';

const App: React.FC = () => {
    const { token } = theme.useToken();
    const cachedData = getCacheData();
    const [dataList, setDataList] = useState<any>(cachedData?.dataList || []);
    const [startIndexModalVisible, setStartIndexModalVisible] = useState<boolean>(false);
    const [generatedStr, setGeneratedStr] = useState<string>(cachedData?.generatedStr || '');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [form] = Form.useForm();

    const handleAdd = (values: any) => {
        if (dataList.some((item: any) => item.key === values.key)) {
            message.error('key is exist');
            return;
        }
        setDataList(dataList.concat(values));
    };

    const handleGenerate = ({ key }: any) => {
        let sqlStartIndex: any = parseInt(key, 10);
        const injectedDataList = dataList.map((item: any) => {
            const enIndex = sqlStartIndex;
            const arIndex = sqlStartIndex + 1;
            const formattedData = {
              enIndex,
              arIndex,
              en: item.en.trim(),
              ar: item.ar.trim(),
              key: item.key.trim(),
              menu: item.menu.trim(),
            }
            const formatted = formatI18nData(formattedData);
            sqlStartIndex = arIndex + 1;
            return formatted;
        });
        setGeneratedStr(injectedDataList.join('\n'));
        setDrawerOpen(true);
        form.resetFields();
        setStartIndexModalVisible(false);
    };

    const ConfirmFormContent = () => {
        return (
            <Form form={form} onFinish={handleGenerate}>
                <Form.Item
                    label="Start Index"
                    name="key"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        );
    };

    useEffect(() => {
        saveCacheData(dataList, generatedStr);
    }, [dataList, generatedStr]);

    const columns = [
        { title: 'key', dataIndex: 'key' },
        { title: 'En Value', dataIndex: 'en', width: 440, ellipsis: true },
        { title: 'Ar Value', dataIndex: 'ar', width: 440, ellipsis: true },
        { title: 'Menu', dataIndex: 'menu', width: 150 },
        {
            title: 'Operation',
            width: 120,
            render: (value: any, record: any) => {
                return (
                    <Space>
                        <Button
                            key={record.key}
                            style={{ padding: 0 }}
                            type="link"
                            onClick={() => {
                                setDataList(dataList.filter((item: any) => item.key !== record.key));
                            }}
                        >
                            remove
                        </Button>
                        ,
                    </Space>
                );
            },
        },
    ];

    return (
        <PageContainer>
            <div className="i18n-generator">
                <div>
                    <I18nGeneratorForm
                        resultString={generatedStr}
                        enabledGenerate={dataList.length}
                        handleAdd={handleAdd}
                        handleClear={() => {
                            setDataList([]);
                            setGeneratedStr('');
                        }}
                        handleGenerate={() => {
                            setStartIndexModalVisible(true);
                        }}
                    />
                    <div style={{ flex: 1, marginTop: 12, overflowY: 'auto' }}>
                        <Table
                            size="small"
                            dataSource={dataList}
                            pagination={false}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
            <Modal
                open={startIndexModalVisible}
                onCancel={() => {
                    setStartIndexModalVisible(false);
                }}
                destroyOnClose
                maskClosable={false}
                title="Please Set Start Index"
                onOk={() => { 
                    form.submit();
                }}
            >
                <ConfirmFormContent />
            </Modal>
            <Drawer
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                }}
                closeIcon={null}
                destroyOnClose
                size="large"
                extra={
                    <Space>
                        <Button
                            onClick={() => { copyResult(generatedStr);}}
                            type="primary"
                            disabled={!generatedStr}
                        >
                            <CopyOutlined /> Copy
                        </Button>
                        <Button onClick={() => {setDrawerOpen(false);}}>
                            Close
                        </Button>
                    </Space>
                }
            >
                <pre
                    style={{
                        background: token.colorFillAlter,
                        padding: 24,
                        flex: 1,
                        marginBottom: 0,
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {generatedStr}
                </pre>
            </Drawer>
        </PageContainer>
    );
};

export default App;

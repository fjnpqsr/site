import './index.less'

import { CopyOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, List,message, Modal,Row, Space, theme } from 'antd';
import React, { useEffect,useState } from 'react';

import PageContainer from '@/components/PageContainer';

const WITH_ID_SCRIPT_TEMPLATE = `
INSERT INTO user_menu_multi_lang_cfg (user_menu_multi_lang_cfg_id, client_id, display_value, lang, client_type, menu ) VALUES ('{enIndex}','{key}','{value}', 'en', 'pc','{menu}');
INSERT INTO user_menu_multi_lang_cfg (user_menu_multi_lang_cfg_id, client_id, display_value, lang, client_type, menu ) VALUES ('{arIndex}','{key}', '{arValue}', 'ar', 'pc','{menu}');
`;

const SESSION_STORAGE_KEY = 'i18n-generator'

const getCacheData = () => {
    const cacheData = window.localStorage.getItem(SESSION_STORAGE_KEY) || '{}'
    console.log({cacheData})
    const {dataList, generatedStr} = JSON.parse(cacheData)
    console.log(JSON.parse(cacheData))
    return {dataList, generatedStr}
}

const AdvancedSearchForm = ({
    handleAdd,
    handleClear,
    handleGenerate,
    resultString
    }:any) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };
    function copyResult () {
        const input = document.createElement('textarea');
        input.className='copy-shadow'
        input.value=resultString
        document.body.appendChild(input);
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            message.success('SQL Copied Success!')
        }
        document.body.removeChild(input);
    }
    return (
        <Form
            form={form}
            name="advanced_search"
            style={formStyle}
            onFinish={handleAdd}
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item 
                        label="Key" 
                        name='key'
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item 
                        label="Menu"
                        name='menu' 
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item 
                        label="En"
                        name='en' 
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item 
                        label="Ar"
                        name='ar' 
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Space>
                        <Button type="primary" htmlType="submit">Add</Button>
                        <Button onClick={handleClear}>Clear</Button>
                        <Button onClick={handleGenerate}>Generate</Button>
                        <Button onClick={copyResult} type='text'disabled={!resultString} >
                            <CopyOutlined />
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Form>
    );
};

const App: React.FC = () => {
    const { token } = theme.useToken();
    const cachedData = getCacheData()
    const [dataList, setDataList] = useState<any>(cachedData?.dataList || [])
    const [detail, setDetail] = useState<any>(undefined)
    const [startIndexModalVisible, setStartIndexModalVisible] = useState<boolean>(false)
    const [generatedStr, setGeneratedStr] = useState<string>(cachedData?.generatedStr || '')
    const [form] = Form.useForm();
    const handleAdd = (values: any) => {
        if (dataList.some((item:any) => item.key === values.key)) {
            message.error('key is exist')
            return 
        }
        setDataList(dataList.concat(values))
    };
    
    const handleGenerate = ({key}: any) => {
        let sqlStartIndex:any = parseInt(key, 10)
        const injectedDataList = dataList.map((item:any) => {
            const enIndex = sqlStartIndex 
            const arIndex = sqlStartIndex + 1
            const formatted =  WITH_ID_SCRIPT_TEMPLATE
                .replaceAll('{key}', item.key)
                .replaceAll('{enIndex}', enIndex)
                .replaceAll('{arIndex}', arIndex)
                .replaceAll('{value}', item.en)
                .replaceAll('{arValue}', item.ar)
                .replaceAll('{menu}', item.menu)
            sqlStartIndex = arIndex + 1
            return formatted
        })
        setGeneratedStr(injectedDataList.join('\n'))
        setStartIndexModalVisible(false)
    }
    const ConfirmFormContent = () => {
        return (
            <Form form={form} onFinish={handleGenerate}>
               <Form.Item 
                    label="Start Index" 
                    name='key'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        )
    }

    useEffect(() => {
        window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({dataList, generatedStr}))
    }, [dataList, generatedStr])

    const renderItem = (dataItem: any) => {
        const actions = [
            <Button 
                key={dataItem.key}
                style={{padding: 0}} 
                type='link'
                onClick={() => {
                    setDataList(dataList.filter((item:any) => item.key!==dataItem.key))
                }}
            >
                remove
            </Button>,
            <Button 
                key={dataItem.key}
                style={{padding: 0}} 
                type='link'
                onClick={() => {
                    setDetail(dataItem)
                }}
            >
                detail
            </Button>
        ]
        const detailActions = [
            <Button 
                key={dataItem.key}
                style={{padding: 0}} 
                type='link'
                onClick={() => {
                    setDetail(undefined)
                }}
            >
                back
            </Button>
        ]

        const desc = detail ? `En: ${dataItem.en.trim()} \nAr: ${dataItem.ar.trim()}` : dataItem.en.trim()

        return (
           <List.Item 
                key={dataItem.key}
                actions={detail ? detailActions : actions}
            >
                <List.Item.Meta
                    title={`[${dataItem.menu}] > ${dataItem.key}`}
                    description={desc}
                />
           </List.Item>
        )
    }

    return (
        <PageContainer>
           <div className='i18n-generator'>
                <div >
                    <AdvancedSearchForm 
                        resultString={generatedStr}
                        handleAdd={handleAdd}
                        handleClear={() => {
                            setDataList([])
                            setGeneratedStr('')
                        }}
                        handleGenerate={() => {
                            setStartIndexModalVisible(true)
                        }}
                    />
                    <div style={{flex: 1, marginTop: 12, overflowY: 'auto'}}>
                        <List 
                            size='small'
                            dataSource={detail ? [detail] : dataList}
                            pagination={false}
                            renderItem={renderItem}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <Button 
                            block 
                            type='primary' 
                            style={{marginBottom: 12}}
                            onClick={() => setGeneratedStr('')}
                        >
                            Clear Result
                        </Button>
                    </div>
                    <pre 
                        style={{
                            background: token.colorFillAlter,
                            padding: 24,
                            flex: 1,
                            marginBottom: 0,
                            whiteSpace: 'pre-wrap'
                            
                        }}
                    >{generatedStr}</pre>
                </div>
           </div>
           <Modal
                open={startIndexModalVisible}
                onCancel={() => {
                    setStartIndexModalVisible(false)
                }}
                maskClosable={false}
                title='Please Set Start Index'
                onOk={() => {
                    form.submit()
                }}
           >
                <ConfirmFormContent />
           </Modal>
        </PageContainer>
    );
};

export default App;

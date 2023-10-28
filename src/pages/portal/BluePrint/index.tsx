import PageContainer from '@/components/PageContainer';
import ComponentCollapse from './components/ComponentCollapse';
import css from './index.module.less';
import { useRef, useState } from 'react';
import BluePrintEditor from './components/BluePrintEditor';
import NodePropsDrawer from './components/NodePropsDrawer';
import {type G6GraphEvent, Util} from '@antv/g6'
import {Button, Form, Input, Select, Space, message} from 'antd'
import { getJSXNodeAttrFromEvent, getNodeDataFromEvent } from './utils/item';

const FormItem = Form.Item 

const BluePrintPage = () => {
    const [chartData, setChartData] = useState<any>({ nodes: [], edges: [] });
    const [selectNode, setSelectNode] = useState<G6GraphEvent|undefined>(undefined);
    const graphRef = useRef<any>(null);

    const [form] = Form.useForm<any>()
  
    const onClose = () => {setSelectNode(undefined)}
    const saveProps = () => {
        form.submit()
    }
    return (
        <PageContainer transparent padding={false}>
            <div className={css['blue-print-container']}>
                <div className={css['blue-print-category']}>
                    <div className={css['blue-print-category-title']}>
                        Components
                    </div>
                    <div className={css['blue-print-category-content']}>
                        <ComponentCollapse />
                    </div>
                </div>
                <div className={css['blue-print-editor']}>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                        }}
                    >
                        <BluePrintEditor
                            graphRef={graphRef}
                            data={chartData}
                            setChartData={setChartData}
                            onNodeClick={(event: G6GraphEvent) => {
                                const nodeModel = getNodeDataFromEvent(event)
                                const customEvent = getJSXNodeAttrFromEvent(event, 'customevent')
                                switch(customEvent) {
                                    case 'openModal':
                                        message.destroy()
                                        message.info('click image trigger custom event')
                                        break
                                    default: 
                                        setSelectNode(event);
                                        form.setFieldsValue(nodeModel)
                                    break
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <NodePropsDrawer 
                open={!!selectNode}
                node={selectNode}
                onClose={onClose}
                destroyOnClose
                extra={
                    <Space>
                      <Button onClick={onClose}>Cancel</Button>
                      <Button onClick={saveProps} type="primary">
                        Save
                      </Button>
                    </Space>
                  }
            >
                <Form 
                    form={form} 
                    layout='vertical' 
                    colon={true}
                    onFinish={(values) => {
                        if (selectNode) {
                            selectNode.item.update(values)
                        }
                        onClose()
                    }}
                >
                    <FormItem name='name' label='Name'>
                        <Input />
                    </FormItem>
                    <FormItem name='size' label='Size'>
                        <Select options={[
                            {label: '2G', value: '2G'},
                            {label: '4G', value: '4G'},
                        ]}/>
                    </FormItem>
                    <FormItem name='desc' label='desc'>
                        <Input.TextArea />
                    </FormItem>
                </Form>
            </NodePropsDrawer>
        </PageContainer>
    );
};

export default BluePrintPage;

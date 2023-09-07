import React, {} from 'react'
import PageContainer from '@/components/PageContainer'
import {Form, Select, InputNumber, Button, Space} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const FormList =Form.List
const FormItem =Form.Item

const ResourceForm = () => {

    const diskOptions = [
        {label: 'Disk Name', value: '1'},
        {label: 'Disk Name2', value: '2'},
    ]
    const [form]=Form.useForm()
    const dataDiskValue = Form.useWatch('dataDisk', form) || []
    return (
        <PageContainer>
            <Form
                form={form}
                layout='vertical'
                initialValues={{dataDisk: [{}]}}
                onValuesChange={(changedValue, allValues) => {
                    console.log({allValues})
                }}
            >
                           
                <FormItem
                    label='System Disk'
                    name='systemDiskSize'
                    rules={[{required: true, message: ' '}]}
                >
                    <Space>
                        <InputNumber 
                            style={{width: 120}} 
                        />
                        <span>GB</span>
                    </Space>
                </FormItem>
                <div style={{marginBottom: 4, fontSize: 13, lineHeight: '18px'}}>Data Disk</div>
                <FormList
                    name='dataDisk'
                >
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map((item, index) => {
                                console.log({fields, index, item, dataDiskValue})
                                return (
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <FormItem name={[item.name, 'diskId']}>
                                            <Select 
                                                style={{width: 200, marginRight: 10}} 
                                                options={diskOptions}
                                                allowClear
                                            />
                                        </FormItem>
                                        <FormItem 
                                            name={[item.name, 'diskSize']}
                                            rules={[{required: dataDiskValue[index]?.diskId, message: ' '}]}
                                        >
                                            <Space>
                                                <InputNumber 
                                                    style={{width: 120}} 
                                                    disabled={!dataDiskValue[index]?.diskId}
                                                />
                                                <span>GB</span>
                                            </Space>
                                        </FormItem>
                                    </div>
                                )
                            })}
                            <Form.Item>
                                <Button 
                                    type="dashed" 
                                    style={{width: 118}}
                                    onClick={() => add()} 
                                    icon={<PlusOutlined />}
                                >
                                    Add
                                </Button>
                            </Form.Item>
                        </>
                    )}
                    
                </FormList>
            </Form>
        </PageContainer>
    )
}

export default ResourceForm
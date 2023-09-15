/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-12-21 15:28:37
 * @LastEditTime: 2023-03-31 11:30:57
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\portal\testPage\index.tsx
 */
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Space, Table } from 'antd';

import PageContainer from '@/components/PageContainer';

import css from './index.less';

interface FormListProps {
    schema: any[];
    listName: string;
    rowGutter?: number;
    maxRow?: number;
    operationSpan?: number;
    titleStyle?: any;
    className?: string;
    rules?: any[];
}
const FormList = (props: FormListProps) => {
    const {
        schema,
        listName,
        rowGutter = 12,
        operationSpan = 3,
        maxRow = 10,
        titleStyle = 10,
        className,
        rules = [],
    } = props;

    return (
        <div className={className}>
            <Form.Item label="Value List">
                <Row gutter={rowGutter} style={titleStyle}>
                    {schema.map((item: any) => (
                        <Col key={item.name} span={item.span}>
                            {item.title}
                        </Col>
                    ))}
                </Row>
                <Form.List name={listName} rules={rules}>
                    {(fields, { add, remove }) => {
                        return (
                            <div className="fields-wrapper">
                                {fields.map((field, index) => {
                                    const isLastRow =
                                        index === fields.length - 1;
                                    const showAdd =
                                        isLastRow &&
                                        (index < maxRow - 1 || maxRow === 0);

                                    return (
                                        <Row
                                            gutter={rowGutter}
                                            key={field.name}
                                        >
                                            {schema.map((item: any) => {
                                                const {
                                                    render,
                                                    name,
                                                    span,
                                                    formItemProps,
                                                } = item;
                                                return (
                                                    <Col span={span} key={name}>
                                                        <Form.Item
                                                            name={[
                                                                field.name,
                                                                name,
                                                            ]}
                                                            {...formItemProps}
                                                        >
                                                            {render()}
                                                        </Form.Item>
                                                    </Col>
                                                );
                                            })}
                                            <Col span={operationSpan}>
                                                <Space
                                                    align="center"
                                                    style={{
                                                        height: 32,
                                                        padding: '0 8px',
                                                    }}
                                                >
                                                    {fields.length > 1 && (
                                                        <MinusCircleOutlined
                                                            onClick={() => {
                                                                remove(
                                                                    field.name
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                    {showAdd && (
                                                        <PlusCircleOutlined
                                                            onClick={() => {
                                                                add({});
                                                            }}
                                                        />
                                                    )}
                                                </Space>
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </div>
                        );
                    }}
                </Form.List>
            </Form.Item>
        </div>
    );
};

const I18nSqlMaker = () => {
    const [form] = Form.useForm();
    const formListSchema = [
        {
            title: 'Sequence',
            name: 'fieldKey',
            span: 7,
            formItemProps: {
                rules: [
                    { required: true },
                    {
                        validator: async (_: any, names: any) => {
                            console.log(_, names);
                        },
                    },
                ],
            },
            render: () => {
                return <Input />;
            },
        },
        {
            title: 'English Value',
            name: 'fieldValue',
            span: 7,
            formItemProps: {
                rules: [{ required: true }],
            },
            render: () => {
                return <Input />;
            },
        },
        {
            title: 'Arabic Value',
            name: 'fieldValueAr',
            span: 7,
            formItemProps: {
                rules: [{ required: true }],
            },
            render: () => {
                return <Input />;
            },
        },
    ];

    return (
        <PageContainer>
            <Form
                form={form}
                layout="vertical"
                className={css['add-field-value-list-form']}
                initialValues={{ fieldValues: [{}] }}
                onValuesChange={(changedValue, allValue) => {
                    console.log({ allValue });
                }}
            >
                <Form.Item label="Menu Name" name="menuId">
                    <Input />
                </Form.Item>
                <Form.Item label="Field Name" name="fieldId">
                    <Input />
                </Form.Item>
                <FormList
                    className={css['field-sequence-form']}
                    maxRow={50}
                    schema={formListSchema}
                    listName="fieldValues"
                    titleStyle={{ marginBottom: 7 }}
                    rowGutter={5}
                />
            </Form>
            <Table 
                columns={[
                    {title: 'name'},
                    {title: 'age'},
                    {title: 'job'},
                ]}
                dataSource={[]}
            />
        </PageContainer>
    );
};

export default I18nSqlMaker;

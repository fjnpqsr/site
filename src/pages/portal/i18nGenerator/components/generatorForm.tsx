/*
 * @Author: Qiu Shao Rong
 * @Date: 2023-03-07 14:59:48
 * @LastEditTime: 2023-03-07 15:11:37
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\portal\i18nGenerator\components\generatorForm.tsx
 */
import React, { type FC } from 'react'
import { Button, Col, Form, Input, Row, Space, theme } from 'antd'

interface I18nGeneratorFormProps {
  handleAdd: (values: any) => void
  handleClear: () => void
  handleGenerate: () => void
  enabledGenerate: boolean
}

const I18nGeneratorForm: FC<I18nGeneratorFormProps> = (props): React.ReactElement => {
  const {
    handleAdd,
    handleClear,
    handleGenerate,
    enabledGenerate = false
  } = props
  const { token } = theme.useToken()
  const [form] = Form.useForm()

  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24
  }

  const formSource = [
    { name: 'key', label: 'Key' },
    { name: 'menu', label: 'Menu' },
    { name: 'en', label: 'En' },
    { name: 'ar', label: 'Ar' }
  ]

  return (
		<Form
			form={form}
			name='advanced_search'
			style={formStyle}
			onFinish={handleAdd}
		>
			<Row gutter={24}>
				{formSource.map(item => (
					<Col span={12} key={item.name}>
						<Form.Item
							label={item.label}
							name={item.name}
							rules={[{ required: true }]}
						>
							<Input />
						</Form.Item>
					</Col>
				))}
			</Row>
			<Row>
				<Col span={24} style={{ textAlign: 'right' }}>
					<Space>
						<Button type='primary' htmlType='submit'>
                            Add
						</Button>
						<Button onClick={handleClear}>Clear</Button>
						<Button onClick={handleGenerate} disabled={!enabledGenerate} >
                            Generate
						</Button>
					</Space>
				</Col>
			</Row>
		</Form>
  )
}

export default I18nGeneratorForm

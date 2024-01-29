import ComponentCollapse from '@/pages/portal/CMP/BluePrint/components/ComponentCollapse';
import css from '@/pages/portal/CMP/BluePrint/index.module.less';
import React, { useContext, useRef, useState } from 'react';
import BluePrintEditor from '@/pages/portal/CMP/BluePrint/components/BluePrintEditor';
import NodePropsDrawer from '@/pages/portal/CMP/BluePrint/components/NodePropsDrawer';
import { type G6GraphEvent } from '@antv/g6';
import { Button, Form, Input, Select, Space, message, Drawer, theme } from 'antd';
import { getJSXNodeAttrFromEvent, getNodeDataFromEvent } from '@/pages/portal/CMP/BluePrint/utils/item';
import { context } from '@/context/context';
import {Renderer} from 'amis';

const FormItem = Form.Item;

const BluePrintPage = () => {
	const {state} = useContext(context);
	const {
		token: {  colorBgContainer }
	} = theme.useToken();
	const [chartData, setChartData] = useState<any>({ nodes: [], edges: [] });
	const [showCanvasDrawer, setShowCanvasDrawer] = useState<any>(false);
	const [selectNode, setSelectNode] = useState<G6GraphEvent | undefined>(
		undefined
	);
	const graphRef = useRef<any>(null);

	const [form] = Form.useForm<any>();

	const onClose = () => {
		setSelectNode(undefined);
	};
	const saveProps = () => {
		form.submit();
	};

	const editorRef = useRef<HTMLDivElement>(null);
	console.log({state});
	return (
		<div >
			<div className={css['blue-print-container']} >
				<div className={css['blue-print-category']} style={{backgroundColor: colorBgContainer}}>
					{/* <div className={css['blue-print-category-title']}>
                        Components
					</div> */}
					<div className={css['blue-print-category-content']}>
						<ComponentCollapse />
					</div>
				</div>
				<div className={css['blue-print-editor']} style={{backgroundColor: colorBgContainer}}>
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
						}}
						ref={editorRef}
					>
						<BluePrintEditor
							graphRef={graphRef}
							data={chartData}
							setChartData={setChartData}
							onNodeClick={(event: G6GraphEvent) => {
								const nodeModel = getNodeDataFromEvent(event);
								const customEvent = getJSXNodeAttrFromEvent(
									event,
									'customevent'
								);
								switch (customEvent) {
								case 'openModal':
									message.destroy();
									message.info(
										'click image trigger custom event'
									);
									break;
								default:
									setSelectNode(event);
									form.setFieldsValue(nodeModel);
									break;
								}
							}}
						/>
					</div>
				</div>
			</div>
			<Drawer 
				open={showCanvasDrawer}
				width={'90%'}
				onClose={() => {
					setShowCanvasDrawer(false);
				}}
			>
				<div id='canvas'></div>				
			</Drawer>
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
					layout="vertical"
					colon={true}
					onFinish={(values) => {
						if (selectNode) {
							selectNode.item.update(values);
						}
						onClose();
					}}
				>
					<FormItem name="name" label="Name">
						<Input />
					</FormItem>
					<FormItem name="size" label="Size">
						<Select
							options={[
								{ label: '2G', value: '2G' },
								{ label: '4G', value: '4G' },
							]}
						/>
					</FormItem>
					<FormItem name="desc" label="desc">
						<Input.TextArea />
					</FormItem>
				</Form>
			</NodePropsDrawer>
		</div>
	);
};


export default Renderer({
	type: 'table-header',
	autoVar: true
})(BluePrintPage);
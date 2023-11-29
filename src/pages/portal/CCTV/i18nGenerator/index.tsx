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
	Tabs,
	InputRef,
} from 'antd';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import PageContainer from '@/components/PageContainer';

import I18nGeneratorForm from './components/generatorForm';
import { copyResult, formatI18nData, getCacheData, saveCacheData } from './utils';
import { context } from '@/context/context';


const initialTabs = [
	{label: 'Un Grouped', key: 'tab-0', children: null}
];

const AddTabButton = ({value, setValue, handleAdd }: any) => {
	return (
		<Space.Compact style={{ width: '100%' }}>
			<Input 
				placeholder='New tab name'
				value={value} 
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
			<Button 
				type="primary"
				disabled={!value.trim()}
				onClick={() => {
					if (value.trim()) {
						handleAdd();
					}
				}}
			>New Tab</Button>
		</Space.Compact>
	);
};

const App: React.FC = () => {
	const { token } = theme.useToken();
	const {state} = useContext(context);
	const cachedData = getCacheData();
	const [startIndexModalVisible, setStartIndexModalVisible] = useState<boolean>(false);
	const [generatedStr, setGeneratedStr] = useState<string>();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [tabs, setTabs] = useState<any>(cachedData?.tabs || initialTabs);
	const [form] = Form.useForm();
	const [newTabName, setNewTabName] = useState('');
	const [activeTab, setActiveTab] = useState(cachedData?.activeTab || 'tab-0');
	const [dataListMap, setDataListMap] = useState<any>(cachedData?.dataListMap || {});
	const dataList = dataListMap[activeTab] || [];
	const confirmInputRef = useRef<InputRef>(null);
	console.log({state});
	const updateCurrentTabDataList = (data: any []) => {
		setDataListMap({ ...dataListMap, [activeTab]: data });
	};

	const handleAdd = (values: any) => {
		if (dataList.some((item: any) => item.key === values.key)) {
			message.error('key is exist');
			return;
		}
		updateCurrentTabDataList(dataList.concat(values));
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
			};
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
					<Input  ref={confirmInputRef}/>
				</Form.Item>
			</Form>
		);
	};

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
								updateCurrentTabDataList(dataList.filter((item: any) => item.key !== record.key));
							}}
						>
                            remove
						</Button>
					</Space>
				);
			},
		},
	];

	const formatTabItems = useMemo(() => {
		return tabs.map((item: any, index: number) => {
			if (index === 0) return {...item, closable: false};
			return item;
		});
	},[tabs]);

        
	const handleAddTab = () => {
		setTabs([...tabs, {label: newTabName, key: `tab-${tabs.length}`}]);
		setNewTabName('');
		setDataListMap({
			...dataListMap,
			[`tab-${tabs.length}`]: []
		});
	};

	const onTabsEdit = (targetKey: any, action: 'add' | 'remove') => {
		if (action === 'remove') {
			setActiveTab('tab-0');
			setTabs(tabs.filter((item: any) => item.key !== targetKey));
			const newDataListMap = {...dataListMap};
			delete newDataListMap[targetKey];
			setDataListMap(newDataListMap);
		}
	};

	useEffect(() => {
		saveCacheData(dataListMap, activeTab, tabs);
	}, [dataListMap, tabs, activeTab]);

	useEffect(() => {
		if (startIndexModalVisible) {
			console.log({startIndexModalVisible});
			setTimeout(() => {
				confirmInputRef.current && confirmInputRef.current.focus();
			});
		}
	}, [startIndexModalVisible]);

	return (
		<PageContainer>
			<div className="i18n-generator">
				<div>
					<I18nGeneratorForm
						// resultString={generatedStr}
						enabledGenerate={dataList.length}
						handleAdd={handleAdd}
						handleClear={() => {
							setGeneratedStr('');
							updateCurrentTabDataList([]);
						}}
						handleGenerate={() => {
							setStartIndexModalVisible(true);
						}}
					/>
					<Tabs 
						activeKey={activeTab}
						onChange={(key: string) => {
							setActiveTab(key);
						}}
						style={{marginTop: 12}}
						type="editable-card"
						items={formatTabItems}
						onEdit={onTabsEdit}
						tabBarExtraContent={{
							right: (
								<AddTabButton 
									value={newTabName} 
									setValue={setNewTabName}
									handleAdd={handleAddTab}
								/>
							)
						}}
						hideAdd
					/>
					<div style={{ flex: 1, overflowY: 'auto' }}>
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
						color: token.colorTextDescription,
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

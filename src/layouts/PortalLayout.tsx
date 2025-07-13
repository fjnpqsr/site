import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons';
import {  Button, Divider, Layout, Menu, message, Modal, Space, theme } from 'antd';
import React, { useState, useContext } from 'react';
import { history, Outlet } from 'umi';
import logo from '@/assets/logo.gif';
import logoSmall from '@/assets/logo-small.png';

import ThemeSwitch from '@/components/ThemeControls/ThemeSwitch';
import menusData from '@/constant/menu';
import { context } from '@/context/context';

import css from './PortalLayout.less';
import useRequest from '@/utils/useRequest';

const { Header, Sider, Content } = Layout;

const PortalLayout: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const { state, updateContext } = useContext(context);
	const {request} = useRequest();
	const {
		token: { colorBgLayout, colorBgContainer },
	} = theme.useToken();

	const handleMenuClick = (menuItem: any) => {
		history.push(menuItem.key);
	};

	async function doLogout() {
		const res = await request('/official-website/logout', {
			method: 'post'
		});
		const {code, msg} = res;
		if (code === '200') {
			message.destroy();
			message.success('登出成功!');
			history.replace('/login');
			updateContext({type: 'theme', payload: 'light'});
			updateContext({type: 'token', payload: undefined});
			sessionStorage.removeItem('token');
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	const logout = () => {
		Modal.confirm({
			type: 'warning',
			title: '提示',
			content: '你确定要退出登录吗?',
			onOk: () => {
				return doLogout();
			}
		});
	};
	return (
		<Layout className={css['basic-layout']}>
			
			<Sider
				trigger={null}
				width={collapsed ? 80 : 240}
				collapsible
				collapsed={collapsed}
				theme={state.theme}
			>
				<div className={css['basic-layout-aside']}>
					<div style={{display: 'flex', height: 63,alignItems: 'center', justifyContent: 'center',backgroundColor: colorBgContainer }}>
						<img src={collapsed ? logoSmall: logo} height={48} width={collapsed ? 48: 'auto'}/>
					</div>
					<div style={{backgroundColor: colorBgContainer}}>
						<Divider size="small" style={{marginTop: 0}}/>
						
					</div>
					<Menu
						items={menusData}
						onClick={handleMenuClick}
						className={css.menu}
					/>
				</div>
			</Sider>
			<Layout className={css['layout-container']}>
				<Header
					className={css['layout-header']}
					style={{
						backgroundColor: colorBgContainer,
					}}
				>
					<div className={css['layout-header-left']}>
						<Space size={24}>
							{React.createElement(
								collapsed
									? MenuUnfoldOutlined
									: MenuFoldOutlined,
								{
									className: 'trigger',
									style: { fontSize: 20 },
									onClick: () => {
										setCollapsed(!collapsed);
									},
								}
							)}
						</Space>
					</div>
					<div className={css['layout-header-right']}>
						<Space size={'large'}>
							<ThemeSwitch />
							<Button type='text' 
								onClick={logout}
							>登出</Button>
						</Space>
					</div>
				</Header>
				<Content style={{ backgroundColor: colorBgLayout }}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default PortalLayout;

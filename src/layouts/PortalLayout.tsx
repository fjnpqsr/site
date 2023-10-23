import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Space, theme } from 'antd';
import React, { useState } from 'react';
import { useContext } from 'react';
import { history, Outlet } from 'umi';

import ThemeSwitch from '@/components/ThemeControls/ThemeSwitch';
import menusData from '@/constant/menu';
import { context } from '@/context/context';

import css from './PortalLayout.less';

const { Header, Sider, Content } = Layout;

const PortalLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { state } = useContext(context);
    const {
        token: { colorBgBase, colorBgLayout },
    } = theme.useToken();

    const handleMenuClick = (menuItem: any) => {
        history.push(menuItem.key);
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
                    <div
                        className={css['logo']}
                        style={{
                            background: colorBgBase,
                        }}
                        onClick={() => {
                            history.push('/portal')
                        }}
                    >
                        Tools
                    </div>
                    <Menu
                        items={menusData}
                        onClick={handleMenuClick}
                        className={css['menu']}
                    />
                </div>
            </Sider>
            <Layout className={css['layout-container']}>
                <Header
                    className={css['layout-header']}
                    style={{
                        background: colorBgBase,
                    }}
                >
                    <div className={css['layout-header-left']}>
                        <Space size={24}>
                            {React.createElement(
                                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                {
                                    className: 'trigger',
                                    style: {fontSize: 20},
                                    onClick: () => setCollapsed(!collapsed),
                                }
                            )}
                            <HomeOutlined 
                                style={{fontSize: 20}}
                                onClick={() => history.push('/portal')}
                            />
                        </Space>
                    </div>
                    <div className={css['layout-header-right']}>
                        <ThemeSwitch />
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

import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useContext } from 'react';
import { history, Outlet } from 'umi';

import ThemeSwitch from '@/components/ThemeControls/ThemeSwitch';
import menusData from '@/constant/menu';
import { context } from '@/context/context';

import css from './BasicLayout.less';

const { Header, Sider, Content } = Layout;

const BasicLayout: React.FC = () => {
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
                collapsible
                collapsed={collapsed}
                theme={state.theme}
                onCollapse={(e) => {
                    setCollapsed(e);
                }}
            >
                <Menu
                    items={menusData}
                    onClick={handleMenuClick}
                    className={css['menu']}
                />
            </Sider>
            <Layout className={css['layout-container']}>
                <Header
                    className={css['layout-header']}
                    style={{
                        background: colorBgBase,
                    }}
                >
                    <div className={css['layout-header-left']}></div>
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

export default BasicLayout;

import { theme } from 'antd';
import cns from 'classnames';
import React, { FC } from 'react';

import css from './index.less';

interface PageContainerViewContentProps {
    children?: React.ReactNode;
    padding?: boolean;
    transparent?: boolean;
}

const PageContainerViewContent: FC<PageContainerViewContentProps> = ({
    children,
    padding,
    transparent,
}) => {
    const className = [css['page-container-view-content']];
    if (!padding) {
        className.push(css['no-padding']);
    }
    if (transparent) {
        className.push(css['transparent']);
    }

    const {
        token: { colorBgContainer, colorText },
    } = theme.useToken();

    return (
        <div
            className={cns(className)}
            style={{
                backgroundColor: colorBgContainer,
                color: colorText,
            }}
        >
            {children}
        </div>
    );
};

export default PageContainerViewContent;

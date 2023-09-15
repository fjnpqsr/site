import React, { FC } from 'react';
import {KeepAlive} from 'react-activation'

import PageContainerViewContent from './ViewContent';

interface PageContainerProps {
    children?: React.ReactNode;
    title?: string;
    padding?: boolean;
    transparent?: boolean;
}

const PageContainer: FC<PageContainerProps> = (props) => {
    const { children, padding = true, transparent = false } = props;
    return (
        <KeepAlive cacheKey={window.location.pathname}>
            <PageContainerViewContent padding={padding} transparent={transparent}>
                {children}
            </PageContainerViewContent>
        </KeepAlive>
    );
};

export default PageContainer;

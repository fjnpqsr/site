import React, { FC } from 'react';

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
        <PageContainerViewContent padding={padding} transparent={transparent}>
            {children}
        </PageContainerViewContent>
    );
};

export default PageContainer;

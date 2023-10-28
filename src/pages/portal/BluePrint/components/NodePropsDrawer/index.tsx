import React, { FC } from 'react';
import { NodePropsDrawerProps } from './type';
import { Drawer } from 'antd';

const NodePropsDrawer: FC<NodePropsDrawerProps> = (props) => {
    const { node } = props;
    const nodeModel = node?.item?.getModel();
    return (
        <Drawer title={nodeModel?.data?.name} {...props}>
            {props.children}
        </Drawer>
    );
};

export default NodePropsDrawer;

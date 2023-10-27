import React, {FC} from 'react';
import { useDrop } from 'react-dnd';

interface DropWrapperProps {
    accept: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onDrop?: () =>void;
}
const DropWrapper:FC<DropWrapperProps> = (props) => {
    const {style, children} = props;
    return (
        <div style={{...style, width: '100%', height: '100%'}}>
            {children}
        </div>
    );
};

export default DropWrapper;
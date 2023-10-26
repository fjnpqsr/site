import React, {FC} from 'react';
import { useDrop } from 'react-dnd';

interface DropWrapperProps {
    accept: string;
    children?: React.ReactElement;
    style?: React.CSSProperties;
    onDrop?: () =>void;
}
const DropWrapper:FC<DropWrapperProps> = (props) => {
    const {style, children} = props;
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'node-item',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      }));
    return (
        <div ref={drop} style={{...style, width: '100%', height: '100%'}}>
            {children}
        </div>
    );
};

export default DropWrapper;
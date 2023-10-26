import React, {FC} from 'react';

import { useDrag } from 'react-dnd';
interface DraggableNodeItemProps {
    data: any
    onItemDrop: (itemData:any) => void
}
const DraggableNodeItem:FC<DraggableNodeItemProps> = (props) => {
    const {data, onItemDrop} = props;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'node-item',
        item: data,
        end: (item, monitor) => {
            onItemDrop({...item, parentId: undefined});
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),
      }));
    const opacity = isDragging ? 0.4 : 1;
    return (
        <div 
            ref={drag} 
            style={{  
                opacity ,
                border: '1px solid #dedede',
                borderRadius: 6,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                marginBottom: 12,
            }} 
            data-testid={`box`}
        >
            {data.treeId}
      </div>
    );
};

export default DraggableNodeItem;
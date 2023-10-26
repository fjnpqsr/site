import React, {FC} from 'react';
import DraggableNodeItem from './nodeItem';
import data from  '../data';

const DraggableNodeList = (props) => {
    const {onItemDrop} = props;
    const nodeList:any = data.nodeList;
    return (
        <div style={{padding: '6px 12px', overflowY: 'scroll', height: '100%'}}>
            {nodeList.map((item:any) => (
                <DraggableNodeItem key={item.id} data={item} onItemDrop={onItemDrop}/>
            ))}
        </div>
    );
};

export default DraggableNodeList;
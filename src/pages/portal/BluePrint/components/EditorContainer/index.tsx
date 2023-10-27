import React, { FC } from 'react';
import BluePrintEditor from '../BluePrintEditor';

interface EditorContainerProps {
    dataSource: any
}

const EditorContainer:FC<EditorContainerProps> = (props) => {
    const {dataSource = []} = props;
    
    return (
        <div style={{ width: '100%', height: '100%'}}>
            <BluePrintEditor data={dataSource}/>
        </div>
    );
};

export default EditorContainer;
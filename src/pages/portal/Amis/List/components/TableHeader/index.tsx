import React, {FC}  from 'react';
import {Renderer, RendererProps} from 'amis';
import {Alert} from 'antd';

interface CustomTableHeaderProps extends RendererProps {
    tip?: string
}

const CustomTableHeader:FC<CustomTableHeaderProps> = (props) => {
	const {tip} = props;
	return (
		<Alert message={tip}/>
	);
};

export default Renderer({
	type: 'table-header',
	autoVar: true
})(CustomTableHeader);
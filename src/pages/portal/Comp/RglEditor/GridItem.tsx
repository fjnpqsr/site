import React, { FC } from 'react';
import { Card } from 'antd';


interface IGridItem {
    children?: React.ReactNode;
}

const RglGridItem: FC<IGridItem> = (props) => {
	const {children} = props;




	return (
		<div className='Rgl-grid-item' >
			<Card>{children}</Card>
		</div>
	);
};

export default RglGridItem;
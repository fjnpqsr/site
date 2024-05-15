import React, { useMemo, useState } from 'react';
import GridLayout from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import RglGridItem from './GridItem';
import './index.less';
import PropsPanel from './PropsPanel';
import ComponentsPanel from './ComponentsPanel';


const DEFAULT_GRID_CONFIG = {
	w: 2,
	h: 2
};
const MyGridLayout = () => {
	const layout = [
		{ i: 'a', x: 0, y: 0, ...DEFAULT_GRID_CONFIG },
		{ i: 'b', x: 2, y: 0, ...DEFAULT_GRID_CONFIG, },
		{ i: 'c', x: 4, y: 0, ...DEFAULT_GRID_CONFIG }
	];
	const [layoutData, setLayoutData] = useState<any>(layout);
	const [activeGridKey, setActiveGridKey]=useState<string>('');

	const handleLayoutChange = (layout: Layout[]): void => {
		setLayoutData(layout);
	};
	// 查询激活的grid
	const activeGrid = useMemo(() => {
		return layout.filter(item=> item.i === activeGridKey)[0];
	}, [activeGridKey]);

	console.log({ layoutData,activeGrid });


	const handleGridClick = (key:string) => {
		setActiveGridKey(key);
	};

	return (
		<div className='Rgl-grid'>
			<div className='Rgl-header'>123</div>
			<div className='Rgl-grid-content'>
				<ComponentsPanel></ComponentsPanel>
				<div style={{width: 1600}}>
					<GridLayout
						className="layout"
						cols={12}
						rowHeight={50}
						width={1320}
						layout={layoutData}
						onLayoutChange={handleLayoutChange}
					>
				
						{layout.map(item => (
							<div key={item.i} onClick={() => {
								handleGridClick(item.i);
							}}>
								<RglGridItem>{item.i}</RglGridItem>
							</div>
						))}
					</GridLayout>
				</div>
				<PropsPanel></PropsPanel>
			</div>
		</div>
	);
};

export default MyGridLayout;
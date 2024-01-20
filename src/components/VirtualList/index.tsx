import React, { useRef, useState } from 'react';
import type { FC } from 'react';
import css from './index.module.less';

interface VirtualListProps {
    data: any[];
    height: number;
    size: number;
    buffer?: number;
}

const classMap = {
	root: css['virtual-list'],
	wrapper: css['virtual-list-wrapper'],
	container: css['virtual-list-container'],
	content: css['virtual-list-content'],
};

const VirtualList: FC<VirtualListProps> = (props) => {
	const { height, size, data, buffer = 0 } = props;
	const itemHeight = Math.floor(height / size);
	const [start, setStart] = useState(0);
	const viewPortRef = useRef<HTMLDivElement>(null);
	const itemsContainerRef = useRef<HTMLDivElement>(null);
	const subList = data.slice(
		start - buffer < 0 ? 0 : start - buffer,
		start + size + buffer
	);
	const totalHeight = itemHeight * data.length;

	const scrollHandle = () => {
		if (!viewPortRef.current || !itemsContainerRef.current) return;
		const { scrollTop } = viewPortRef.current;
		const startIndex = Math.floor(scrollTop / itemHeight);
		setStart(startIndex);
		const distance =
            (startIndex - buffer < 0 ? 0 : startIndex - buffer) * itemHeight;
		itemsContainerRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
	};

	return (
		<div className={classMap.wrapper}>
			<div
				className={classMap.root}
				ref={viewPortRef}
				onScroll={scrollHandle}
				style={{ height }}
			>
				<div
					className={classMap.container}
					style={{ height: totalHeight }}
				>
					<div className={classMap.content} ref={itemsContainerRef}>
						{subList.map((item: any) => (
							<div key={item.key} style={{ height: itemHeight, display: 'flex', alignItems: 'center' }}>
								{item.label}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VirtualList;

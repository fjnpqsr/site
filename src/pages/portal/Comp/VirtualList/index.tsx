import React, {useState, useRef, useEffect} from 'react';
import PageContainer from '@/components/PageContainer';

const bigArray = new Array(20).fill('');
const bigData = bigArray.map((item, index) => ({label: index, key: `data-${index}`}));
const VirtualList = () => {

	const [data] = useState<any[]>(bigData);
	const [start, setStart] = useState(0);
	const scrollRef=useRef<HTMLDivElement>(null);
	const contentRef=useRef<HTMLDivElement>(null);
    
	const itemSize = 10;
	const itemHeight = 40;
	const viewHeight = itemHeight * itemSize;

	useEffect(() => {
		return () => {
			setStart(0);
			// contentRef.current.style.transform = `translate3d(0, ${0*itemHeight}px, 0)`;
		};
	}, []);
	const scrollHandle = () => {
		if (!scrollRef.current || !contentRef.current) return;
		const {scrollTop} = scrollRef.current;
		const startIndex = Math.floor(scrollTop/ itemHeight);
		setStart(startIndex);
		contentRef.current.style.transform = `translate3d(0, ${startIndex*itemHeight}px, 0)`;
	};
	const subList = data.slice(start, start + itemSize);
	return (
		<PageContainer>
			<div 
				className='virtual-list' 
				style={{height: viewHeight, overflow: 'auto'}}
				onScroll={scrollHandle}
				ref={scrollRef}
			>
				<div style={{height: itemHeight* data.length}} >
					<div ref={contentRef}>
						{subList.map((item: any) => (
							<div key={item.key} style={{height: itemHeight}}>{item.label}</div>
						))}
					</div>
				</div>
			</div>
		</PageContainer>
	);
};

export default VirtualList;

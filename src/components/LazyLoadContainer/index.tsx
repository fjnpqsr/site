import React, { FC, useEffect, useRef } from 'react';
import {debounce} from 'lodash';

interface LazyLoadImgContainerProps {
    children?: React.ReactNode;
    className?:string;
}
const LazyLoadImgContainer:FC<LazyLoadImgContainerProps> = (props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const {className} = props;

	function  lazyLoadingImg () {
		if (containerRef.current) {
			const allImages = containerRef.current.getElementsByTagName('img');
			Array.from(allImages).forEach(item => {
				// 获取浏览器可视区的高度
				const { top } = item.getBoundingClientRect();
				if (top < document.documentElement.clientHeight) {
					item.src = item.getAttribute('data-src');
				}
			});
		}
	}

	useEffect(() => {
		setTimeout(() => {lazyLoadingImg();});
		if(containerRef.current) {
			const _lazyLoad = debounce(lazyLoadingImg, 500);
			containerRef.current.addEventListener('scroll', _lazyLoad);
		}
		return () => {
			containerRef.current?.removeEventListener('scroll', debounce(lazyLoadingImg, 500));
		};
	}, []);
    
	return (
		<div ref={containerRef} className={className} role='list'>
			{props.children}
		</div>
	);
};

export default LazyLoadImgContainer;
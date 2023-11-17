import PageContainer from '@/components/PageContainer';
import React, { useRef, useState } from 'react';
import css from './index.module.less';
import html2canvas from 'html2canvas';
import { Button, Drawer } from 'antd';
import Charts from './chart';
import LineChart from './testLine';

const Html2Canvas = () => {
	const editorRef = useRef<HTMLDivElement>(null);

	function downloadFn(href = '', defaultFileName: string) {
		if (!href) {
			return;
		}
		const a = document.createElement('a');
		a.href = href;
		a.download = defaultFileName;
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}


	async function makeHTMLImage() {
		if (!editorRef.current) {
			return;
		}
		try {
			const canvas = await html2canvas(editorRef.current, {
				scale: window.innerWidth/1920
			});
			const src = canvas.toDataURL('image/jpeg', 1);
			downloadFn(src, `${new Date().valueOf()}.jpeg`);
			// container.remove();
		} catch (e) {
			console.log(e);
		}
	}

	const handlePdf = () => {
		makeHTMLImage();
	};

	return (
		<PageContainer>
			<Button onClick={() => {handlePdf();}}>Generate PDF</Button>
			<div className={css['wrapper']} >
				<div>
					<Charts />
				</div>
				<div>
					<LineChart />
				</div>
			</div>
			<div className={css['wrapper-back']} ref={editorRef}>
				<div>
					<Charts />
				</div>
				<div>
					<LineChart />
				</div>
			</div>

		
		</PageContainer>
	);
};

export default Html2Canvas;
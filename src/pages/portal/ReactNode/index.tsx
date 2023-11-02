import PageContainer from '@/components/PageContainer';
import React, { useState } from 'react';
import BluePrintEditor from './BluePrintEditor';
import ComponentCollapse from './ComponentCollapse';
import css from './index.module.less';

const RectNodePrint: React.FC = () => {
	const [data, setData] = useState<any>({ nodes: [], edges: [] });

	return (
		<PageContainer>
			<div className={css['blue-print-container']}>
				<div className={css['blue-print-category']}>
					<div className={css['blue-print-category-title']}>
						Components
					</div>
					<div className={css['blue-print-category-content']}>
						<ComponentCollapse />
					</div>
				</div>
				<div className={css['blue-print-editor']}>
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
						}}
					>
						<BluePrintEditor data={data} setData={setData} />
					</div>
				</div>
			</div>
		</PageContainer>
	);
};
export default RectNodePrint;

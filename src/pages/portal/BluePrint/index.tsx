import PageContainer from '@/components/PageContainer';
import ComponentCollapse from './components/ComponentCollapse';
import css from './index.module.less';
import EditorContainer from './components/EditorContainer';
import { useState } from 'react';
import BluePrintEditor from './components/BluePrintEditor';


const BluePrintPage = () => {

    const [chartData, setChartData] = useState<any>({nodes: [],edges:[]});
    
    return (
        <PageContainer transparent padding={false}>
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
                    <div style={{ width: '100%', height: '100%'}}>
                        <BluePrintEditor data={chartData} setChartData={setChartData}/>
                    </div>
                </div>
            </div>

        </PageContainer>
    );
};

export default BluePrintPage;
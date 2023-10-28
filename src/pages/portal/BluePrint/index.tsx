import PageContainer from '@/components/PageContainer';
import ComponentCollapse from './components/ComponentCollapse';
import css from './index.module.less';
import { useRef, useState } from 'react';
import BluePrintEditor from './components/BluePrintEditor';

const BluePrintPage = () => {
    const [chartData, setChartData] = useState<any>({ nodes: [], edges: [] });
    const [selectNode, setSelectNode] = useState<any>(undefined);
    const graphRef = useRef<any>(null);

    console.log({ selectNode, chartData });
    // window.selectNode = selectNode;
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
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                        }}
                    >
                        <BluePrintEditor
                            graphRef={graphRef}
                            data={chartData}
                            setChartData={setChartData}
                            onNodeClick={(node: any) => {
                                setSelectNode(node);
                            }}
                        />
                    </div>
                </div>
                <div
                    className={css['blue-print-node-props']}
                    style={
                        selectNode
                            ? { width: 300, marginLeft: 12 }
                            : { width: 0, marginLeft: 0 }
                    }
                    onClick={() => {
                        setSelectNode(null);
                        if (
                            !graphRef ||
                            !graphRef.current ||
                            graphRef.current.get('destroyed')
                        )
                            return;
                        if (
                            !graphRef.current?.container ||
                            !graphRef.current.container?.scrollWidth ||
                            !graphRef.current.container?.scrollHeight
                        )
                            return;
                        console.dir(graphRef.current?.container);
                        graphRef.current?.changeSize(
                            graphRef.current.container?.scrollWidth + 312,
                            graphRef.current.container?.scrollHeight
                        );
                    }}
                >
                    {selectNode && (
                        <div>
                            <p>click to close</p> 
                            node:
                            {JSON.stringify(selectNode?.item?.getModel()?.data)}
                        </div>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

export default BluePrintPage;

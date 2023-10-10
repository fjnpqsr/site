import { Pie } from '@ant-design/plots';
import React from 'react';


const CMPPie = ({config}: any) => {

    const mergedConfig = {
        data: config?.data || [],
        appendPadding: 10,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [
            { type: 'legend-active', enable: false },
            { type: 'legend-filter', enable: false },
        ],
    }
    
    return (
        <Pie {...mergedConfig} />
    )
}


const DemoPie = () => {
  const data = [
    { type: '分类一', value: 27},
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
  ];
  const config = {
    data,
    statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          content: 'AntV\nG2Plot',
        },
      },
};
  return <CMPPie config={config} />;
};

export default DemoPie
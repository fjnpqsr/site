import React, { useEffect, type FC, useRef } from 'react';
import G6 from '@antv/g6';
import './index.less';
import { useDrop } from 'react-dnd';

const grid = new G6.Grid({});
interface TopologyProps {
  className?: string
  data?: any
}

const fittingString = (str, maxWidth, fontSize) => {
  const ellipsis = '...';
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return;
    if (pattern.test(letter)) {
    // Chinese charactors
      currentWidth += fontSize;
    } else {
    // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`;
    }
  });
  return res;
};
const orgDescriptionMap: any = {
  B: 'Business Group',
  C: 'Project'
};
const mateDescFunc = (objType, cfg) => {
  switch (objType) {
    case 'tenant':
      return 'Tenant';
    case 'hypervisor':
      return 'Host Machine';
    case 'org':
      return orgDescriptionMap[cfg?.orgType];
    case 'resource':
      return cfg?.resourceTypeName;
    default:
      return '';
  }
};

const Topology: FC<TopologyProps> = (props) => {
  const { data } = props;
  const graphRef = useRef<any>(null); 
  const startRender = () => {
    const container = document.getElementById('topology-parent');
    if (container === null) {
      return;
    }

    const width = container.scrollWidth;
    const height = container.scrollHeight;
    G6.registerNode('card-node', {
      draw: function drawShape (cfg: any, group: any) {
        const r = 10;
        const color = '#5173EB';
        const w = cfg.size[0];
        const h = cfg.size[1];
        const shape = group.addShape('rect', {
          attrs: {
            x: -w / 2,
            y: -h / 2,
            width: w, // 200,
            height: h, // 60
            stroke: color,
            radius: r,
            lineWidth: 2,
            fill: '#F0F6FF',
            cursor: 'pointer'
          },
          name: 'main-box',
          draggable: true
        });

        group.addShape('rect', {
          attrs: {
            x: -w / 2,
            y: -h / 2,
            width: w, // 200,
            height: 33, // 60
            fill: color,
            radius: [r, r, 0, 0],
            cursor: 'pointer'
          },

          name: 'title-box',
          draggable: true
        });
        // title text
        group.addShape('text', {
          attrs: {
            textBaseline: 'top',
            x: -w / 2 + 10,
            y: -h / 2 + 10,
            lineHeight: 18,
            fontWeight: 400,
            fontFamily: 'Gotham',
            fontSize: 13,
            text: fittingString(cfg?.objName, 150, 13),
            fill: '#fff',
            cursor: 'pointer'
          },
          name: 'title',
          draggable: true
        });
        cfg.children?.length &&
          group.addShape('marker', {
            attrs: {
              x: w / 2,
              y: -1,
              r: 7,
              cursor: 'pointer',
              symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
              stroke: '#666',
              lineWidth: 1,
              fill: '#fff'
            },
            name: 'collapse-icon'
          });
        group.addShape('image', {
          attrs: (cfg?.objType === 'tenant' || cfg?.objType === 'org' || cfg?.objType === 'hypervisor')
            ? {
                img: cfg?.imgUrl,
                x: -w / 2 + 9.5,
                y: -h / 2 + 32.5,
                width: 40,
                height: 40,
                cursor: 'pointer'
              }
            : {
                img: cfg?.imgUrl,
                x: -w / 2 + 10,
                y: -h / 2 + 33,
                width: 40,
                height: 40,
                cursor: 'pointer'
              },
          name: 'image',
          draggable: true
        });
        group.addShape('text', {
          attrs: {
            textBaseline: 'top',
            x: -w / 2 + 58,
            y: -h / 2 + 46,
            lineHeight: 22,
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'Gotham',
            text: fittingString(mateDescFunc(cfg?.objType, cfg), 114, 14),
            fill: 'rgba(0,0,0, 1)',
            cursor: 'pointer'
          },
          name: 'description',
          draggable: true
        });
        return shape;
      },
      setState (name, value, item) {
        if (name === 'collapsed') {
          const marker = item.get('group').find(ele => ele.get('name') === 'collapse-icon');
          const icon = value ? G6.Marker.expand : G6.Marker.collapse;
          marker.attr('symbol', icon);
        }
      }
    });
    const graph = new G6.TreeGraph({
      container: 'topology',
      width,
      height,
      fitView: true,
      fitCenter: true,
      plugins: [grid],
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'click-select',
          'activate-relations',
          'collapse-expand',
          {
            type: 'create-edge',
            trigger: 'drag'
          },
          {
            type: 'drag-node'
            // enableDelegate: true // 拖拽副本
            // enableDebounce: true
            // enableOptimize: true
          }
        ]
      },
      defaultNode: {
        type: 'card-node',
        size: [188, 73]
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          endArrow: true
        }
      },
      layout: {
        type: 'indented', // 缩进树
        direction: 'LR', // 'LR' | 'RL' | 'H'
        dropCap: false,
        indent: 200, // 缩进值
        getHeight: () => 60 // 设置每个节点的高度
      }
    });
    graph.data(data);
    graph.render();
    graphRef.current = graph;

    // graph.on('node:click', (e) => {
    //   if (e.target.get('name') === 'collapse-icon') {
    //     e.item.getModel().collapsed = !e.item.getModel().collapsed
    //     graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed)
    //     graph.layout()
    //   }
    // })

    // if (typeof window !== 'undefined') {
    //   window.onresize = () => {
    //     if (!graph || graph.get('destroyed')) return
    //     if (!container?.scrollWidth || !container.scrollHeight) return
    //     graph.changeSize(container.scrollWidth, container.scrollHeight)
    //   }
    // }
  };

  useEffect(() => {
    startRender();
  }, []);

  useEffect(() => {
    if (data) {
      console.log('do change data', data);
      graphRef.current?.changeData(data);
    }
  }, [data]);

  return (
    <div 
      style={{ height: '100%', width: '100%', flex: 1 }} 
      id='topology-parent' 

    >
        <div id='topology' />
    </div>
  );
};
export default Topology;

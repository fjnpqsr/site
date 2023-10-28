import G6 from '@antv/g6';



export const registerVMNode = () => {
    G6.registerNode('VM', {
        jsx: (cfg) => {
            return `
            <group>
            <rect 
                style={{
                    width: 184,
                    height: 75,
                    fill: '#666',
                    radius: 4,
                    shadowColor: '#000',
                    shadowBlur: 12,
                    shadowOffsetX: 8,
                    shadowOffsetY: 6,
                    stroke: '#000',
                    opacity: 0.5
                }}
            >
            <rect  
                style={{
                    width: 200,
                    height: 20,
                    fill: {{style.color}},
                    radius: [4, 4, 0, 0],
                    cursor: 'move',
                    stroke: ${cfg.color},
                }} 
                draggable="true"
            >
            <text 
                style={{
                    marginTop: 2,
                    marginLeft: 12,
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fill: '#fff' 
                }}
            >{{name}}</text>
            </rect>
            <rect 
            style={{
                width: 200,
                height: 55,
                stroke: ${cfg.color},
                fill: #ffffff,
                radius: [0, 0, 4, 4],
            }} 
            >
            <circle
                style={{r: 18, stroke: ${cfg.color}, marginTop: 28, marginLeft: 30}}
            >
                <image 
                    name="img" 
                    style={{ img: '{{image}}', width: 20, height: 20,  marginLeft: 20,  marginTop: -9 }} 
                    customevent='openModal'
                />
            </circle>
            <rect
                style={{width: 138,  height: 55, marginTop: -34, marginLeft: 58}}
                
            >
                <text style={{ marginTop: 5, marginLeft: 58, fill: '#333',  }}>描述: {{desc}}</text>
                <text style={{ marginTop: 10, marginLeft: 58, fill: '#333',  }}>大小: {{size}}</text>
            </rect>
            </rect>
            </rect>
            <circle style={{
                stroke: ${cfg.color},
                r: 10,
                fill: '#fff',
                marginLeft: 100,
                cursor: 'pointer'
            }} name="circle">
                <image name="img" style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 12, height: 12,  marginLeft: 94,  marginTop: -5 }} />
            </circle>
            </group>
        `;
        },
        afterDraw(cfg: any, group: any) {
            const bbox = group.getBBox();
            const anchorPoints = this.getAnchorPoints(cfg);
            anchorPoints.forEach((anchorPos: any, i: number) => {
                group.addShape('circle', {
                    attrs: {
                        r: 5,
                        x: bbox.x + bbox.width * anchorPos[0],
                        y: bbox.y + bbox.height * anchorPos[1],
                        fill: '#fff',
                        stroke: '#5F95FF',
                    },
                    // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                    name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
                    anchorPointIdx: i, // flag the idx of the anchor-point circle
                    links: 0, // cache the number of edges connected to this shape
                    visible: false, // invisible by default, shows up when links > 1 or the node is in showAnchors state
                    draggable: true, // allow to catch the drag events on this shape
                });
            });
        },
        getAnchorPoints(cfg: any) {
            return (
                cfg.anchorPoints || [
                    [1, 0.5],
                    [0,0.5]
                ]
            );
        },
        setState(name: any, value: any, item: any) {
            if (name === 'showAnchors') {
                const anchorPoints = item
                    .getContainer()
                    .findAll(
                        (ele: any) => ele.get('name') === 'anchor-point'
                    );
                anchorPoints.forEach((point: any) => {
                    if (value || point.get('links') > 0) point.show();
                    else point.hide();
                });
            }
        },
    });
};

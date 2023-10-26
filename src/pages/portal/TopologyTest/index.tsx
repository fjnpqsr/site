import React, { useState, type FC } from 'react';
import Topology from '@/components/Topology';
import PageContainer from '@/components/PageContainer';
import defaultData from './data';
import { buildTreeNodeAndEdgeToTree } from './transform';
import DraggableNodeList from './NodeList';
import DropWrapper from '@/components/DropWrapper';
interface TopologyProps {
  className?: string
}

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
const TopologyTest: FC<TopologyProps> = () => {
  const [data, setData] = useState<any>(defaultData);
  const { nodeList, relationList } = data;
  const rootNode = `VM_${14947}`;
  const newList = nodeList?.map(item => ({ ...item, collapsed: true, imgUrl: mateDescFunc(item?.objType, item) }));
  const { treeData, treeMap } = buildTreeNodeAndEdgeToTree(newList, relationList, rootNode);
  console.log({ data, treeData, nodeList });

  const handleDropNodeItem = (item) => {
    setData((preData) => {
      return {...preData, nodeList: [...preData.nodeList, item]};
    }); 
  };
  return (
        <PageContainer >
            <div style={{ height: '100%', width: '100%', backgroundColor: '#f5f5f5', display: 'flex' }} >
              <div style={{backgroundColor:'#fff', width: 300, marginRight: 12}}>
                < DraggableNodeList onItemDrop={(itemData:any) => {handleDropNodeItem(itemData);}}/>
              </div >
              <DropWrapper accept='node-item'>
                  <Topology
                    data={treeData}
                  />
                </DropWrapper>
            </div>
        </PageContainer>
  );
};
export default TopologyTest;

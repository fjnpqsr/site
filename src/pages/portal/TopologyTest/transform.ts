interface buildTreeNodeAndEdgeToTreeReturns {
  treeData: any
  treeMap: any
}

export const buildTreeNodeAndEdgeToTree = (nodeList: any[], relationList: any[], rootNode: string): buildTreeNodeAndEdgeToTreeReturns => {
  const nodeMap = {};
  nodeList.forEach(node => {
    nodeMap[node.treeId] = {
      ...node,
      uuid: node?.id,
      id: node?.treeId,
      children: []
    };
  });

  // 构建树结构
  relationList.forEach(edge => {
    const { source, target } = edge;
    const parentNode = nodeMap[source];
    const childNode = nodeMap[target];

    parentNode?.children?.push(childNode);
  });

  return {
    treeData: nodeMap?.[rootNode] || {},
    treeMap: nodeMap
  };
};

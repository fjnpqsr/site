import { processParallelEdgesOnAnchorPoint } from '../registerNodes/utils';
export const registerEvents = (graph: any, params: any) => {
    graph.on('aftercreateedge', (e: any) => {
        const { sourceAnchorIdx, targetAnchorIdx } = params;
        // update the sourceAnchor and targetAnchor for the newly added edge
        graph.updateItem(e.edge, {
            sourceAnchor: sourceAnchorIdx,
            targetAnchor: targetAnchorIdx,
        });

        // update the curveOffset for parallel edges
        const edges: any = graph.save().edges;
        processParallelEdgesOnAnchorPoint(edges);
        graph.getEdges().forEach((edge, i) => {
            graph.updateItem(edge, {
                curveOffset: edges[i].curveOffset,
                curvePosition: edges[i].curvePosition,
            });
        });
    });

    // after drag from the first node, the edge is created, update the sourceAnchor
    graph.on('afteradditem', (e) => {
        if (e.item && e.item.getType() === 'edge') {
            graph.updateItem(e.item, {
                sourceAnchor: sourceAnchorIdx,
            });
        }
    });
    // if create-edge is canceled before ending, update the 'links' on the anchor-point circles
    graph.on('afterremoveitem', (e: any) => {
        if (e.item && e.item.source && e.item.target) {
            const sourceNode = graph.findById(e.item.source);
            const targetNode = graph.findById(e.item.target);
            const { sourceAnchor, targetAnchor } = e.item;
            if (sourceNode && !isNaN(sourceAnchor)) {
                const sourceAnchorShape = sourceNode
                    .getContainer()
                    .find(
                        (ele) =>
                            ele.get('name') === 'anchor-point' &&
                            ele.get('anchorPointIdx') === sourceAnchor
                    );
                sourceAnchorShape.set(
                    'links',
                    sourceAnchorShape.get('links') - 1
                );
            }
            if (targetNode && !isNaN(targetAnchor)) {
                const targetAnchorShape = targetNode
                    .getContainer()
                    .find(
                        (ele) =>
                            ele.get('name') === 'anchor-point' &&
                            ele.get('anchorPointIdx') === targetAnchor
                    );
                targetAnchorShape.set(
                    'links',
                    targetAnchorShape.get('links') - 1
                );
            }
        }
    });
    graph.on('node:mouseenter', (e: any) => {
        graph.setItemState(e.item, 'showAnchors', true);
    });
    graph.on('node:mouseleave', (e: any) => {
        graph.setItemState(e.item, 'showAnchors', false);
    });
    graph.on('node:dragenter', (e: any) => {
        graph.setItemState(e.item, 'showAnchors', true);
    });
    graph.on('node:dragleave', (e: any) => {
        graph.setItemState(e.item, 'showAnchors', false);
    });
    graph.on('node:dragstart', (e: any) => {
        graph.setItemState(e.item, 'showAnchors', true);
    });
    graph.on('node:dragout', (e: any) => {
        graph.setItemState(e.item, 'showAnchors', false);
    });
};
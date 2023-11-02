import { processParallelEdgesOnAnchorPoint } from '../../utils';

export const registerEvents = (graph: any, anchorIndexRef: any) => {
	graph.on('aftercreateedge', (e: any) => {
		// update the sourceAnchor and targetAnchor for the newly added edge
		graph.updateItem(e.edge, {
			sourceAnchor: anchorIndexRef.sourceAnchorIdx,
			targetAnchor: anchorIndexRef.targetAnchorIdx,
		});
		// update the curveOffset for parallel edges
		const edges: any = graph.save().edges;
		processParallelEdgesOnAnchorPoint(edges);
		graph.getEdges().forEach((edge: any, i: any) => {
			graph.updateItem(edge, {
				curveOffset: edges[i].curveOffset,
				curvePosition: edges[i].curvePosition,
			});
		});
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
						(ele: any) =>
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
						(ele: any) =>
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

export const registerCreateEdgeBehavior = (anchorIndexRef: any) => {
    return {
        type: 'create-edge',
        trigger: 'drag', // set the trigger to be drag to make the create-edge triggered by drag
        shouldBegin: (e: any) => {
            // avoid beginning at other shapes on the node
            if (
                e.target &&
                e.target.get('name') !== 'anchor-point'
            )
                return false;
            anchorIndexRef.current.sourceAnchorIdx = e.target.get('anchorPointIdx');
            e.target.set('links', e.target.get('links') + 1); // cache the number of edge connected to this anchor-point circle
            return true;
        },
        shouldEnd: (e: any) => {
            // avoid ending at other shapes on the node
            if (
                e.target &&
                e.target.get('name') !== 'anchor-point'
            )
                return false;
            if (e.target) {
                anchorIndexRef.current.targetAnchorIdx =
                    e.target.get('anchorPointIdx');
                e.target.set(
                    'links',
                    e.target.get('links') + 1
                ); // cache the number of edge connected to this anchor-point circle
                return true;
            }
            anchorIndexRef.current.targetAnchorIdx = undefined;
            return true;
        },
    };
};
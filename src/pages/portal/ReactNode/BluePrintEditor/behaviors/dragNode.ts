export const registerDragNodeBehavior = () => {
	return {
		type: 'drag-node',
		shouldBegin: (e: any) => {
			// 禁用连线点拖拽
			if (e.target.get('name') === 'anchor-point')
				return false;
			return true;
		},
	};
};
export const data = {
	nodes: [
		{
			description: 'VM',
			label: 'VM01',
			color: '#5173EB',
			id: 'node1',
			type: 'test',
			img: '/static/product-vm.png',
			anchorPoints: [
				[0, 0.5],
				[1, 0.5],
			],
		},
		{
			description: 'VPC',
			label: 'VPC',
			color: '#5173EB',
			id: 'node2',
			type: 'test',
			img: '/static/product-vpc.png',
		},
		{
			description: 'EIP',
			label: 'EIP01',
			color: '#5173EB',
			id: 'node3',
			type: 'test',
			img: '/static/product-eip.png',
		},
	],
	// edges: [{ source: 'node1', target: 'node2' }],
};

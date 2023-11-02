export const componentsCategory = [
	{
		key: '1',
		label: 'Category 1',
		components: [
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
				anchorPoints: [
					[0, 0.5],
					[1, 0.5],
				],
			},
			{
				description: 'EIP',
				label: 'EIP01',
				color: '#5173EB',
				id: 'node3',
				type: 'test',
				img: '/static/product-eip.png',
				anchorPoints: [
					[0, 0.5],
					[1, 0.5],
				],
			},
		],
	},
	{
		key: '2',
		label: 'Category 2',
		components: [{ name: 'Business Group', type: 'BG' }],
	},
	{ key: '3', label: 'Category 3' },
];

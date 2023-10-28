export const componentsCategory = [
    {   
        key: '1', 
        label: 'Category 1',
        components: [
            {
                name: 'VM', 
                type: 'VM',
                desc: 'VM desc',
                size: '2G',
                image: '/static/vm.png'
            },
            {
                name: 'STORAGE',
                type: 'VM',
                desc: 'Storage desc',
                size: '4G',
                style: {
                    color: 'red'
                },
                image: '/static/disk.png'
            },
        ]
    },
    {
        key: '2',
        label: 'Category 2',
        components: [
            {name: 'Business Group', type: 'BG'},
        ]
    },
    {key: '3', label: 'Category 3'}
];

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
            {
                name: 'SNAP',
                type: 'VM',
                desc: 'SNAPSHOP desc',
                size: '4G',
                style: {
                    color: 'green'
                },
                image: '/static/island.png'
            },
            {
                name: 'Image',
                type: 'VM',
                desc: 'Image desc',
                size: '4G',
                style: {
                    color: 'orange'
                },
                image: '/static/SLA.png'
            },
            {
                name: 'SLA',
                type: 'VM',
                desc: 'SLA desc',
                size: '4G',
                style: {
                    color: 'blue'
                },
                image: '/static/tesla.png'
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

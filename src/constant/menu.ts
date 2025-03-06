/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 14:12:09
 * @LastEditTime: 2023-04-20 09:43:15
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\constant\menu.ts
 */

const menusData = [
	{
		label: '组件测试',
		key: '/portal/Comp',
		children: [
			{
				label: '虚拟滚动',
				key: '/portal/Comp/VirtualList'
			},
			{
				label: '图片懒加载',
				key: '/portal/Comp/LazyLoadImg',
			}
		],
	},
];

export default menusData;

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
		label: '图片处理',
		key: '/portal/CCTV/ImageEditor',
	},
	{
		label: '生成多语言脚本',
		key: '/portal/CCTV/i18nGenerator',
	},
	{
		label: 'BluePrint',
		key: '/portal/CMP/BluePrint',
	},
	{
		label: '颜色采集',
		key: '/portal/CMP/ColorDefine',
	},
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
			},
			{
				label: '图片裁剪',
				key: '/portal/Comp/CropImage',
			},
		],
	},
	{
		label: 'CCTV',
		key: '/portal/CCTV',
		children: [
			{
				label: '车辆伴随数据生成',
				key: '/portal/CCTV/vehicleAccompanyDataGenerator',
			},
			{
				label: '生成MQ消息',
				key: '/portal/CCTV/mqGenerator',
			},
			{
				label: '从EXCEL导出多语言脚本',
				key: '/portal/CCTV/i18nSqlMaker',
			},
		],
	},
];

export default menusData;

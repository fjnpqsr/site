/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 14:12:09
 * @LastEditTime: 2023-04-20 09:43:15
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\constant\menu.ts
 */
import React from 'react';
import {
	CommentOutlined,
	FileDoneOutlined,
	FileTextOutlined,
	HomeOutlined,
	LaptopOutlined,
	NotificationOutlined,
	ProjectOutlined,
} from '@ant-design/icons';

const menusData = [
	{
		label: '首页',
		key: '/portal',
		icon: (
			<HomeOutlined
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
		),
	},
	{
		label: '站内信',
		key: '/portal/Message',
		icon: (
			<CommentOutlined
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
		),
	},
	{
		label: 'Banner管理',
		key: '/portal/Banners',
		icon: (
			<LaptopOutlined
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
		),
	},
	{
		label: '新闻管理',
		key: '/portal/News',
		icon: <FileTextOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
	},
	{
		label: '服务管理',
		key: '/portal/Services',
		icon: <ProjectOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
	},
	{
		label: '案例管理',
		key: '/portal/Cases',
		icon: <FileDoneOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
	},
	{
		label: '招聘管理',
		key: '/portal/Jobs',
		icon: <NotificationOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
	},
];

export default menusData;

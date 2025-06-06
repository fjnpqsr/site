import { List, Image, theme } from 'antd';
import React, { useState } from 'react';
import css from './index.module.less';
export default function BannerList(props: {selected: any, onClick: any}) {
	const {selected, onClick} = props;
	const [pageSize, setPageSize] = useState<any>(4);
	const {token: {colorPrimary}} = theme.useToken();
	const data = Array.from({ length: 23 }).map((_, i) => ({
		href: 'https://ant.design',
		title: `ant design part ${i}`,
		key: `key-${i}`,
		avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
		description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
		content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
	}));
    
	return (
		<List
			itemLayout="vertical"
			className={css.bannerList}
			size="small"
			pagination={{
				pageSize: pageSize,
				size: 'small',
				showSizeChanger: true,
				pageSizeOptions: [3, 4, 8],
				onShowSizeChange(current, size) {
					setPageSize(size);
				},
			}}
			dataSource={data}
			renderItem={(item) => (
				<List.Item
					className={item.key === selected?.key? css.selected: ''}
					style={{borderLeftColor: colorPrimary}}
					key={item.title}
					onClick={() => {
						onClick({...item, type: 'edit'});
					}}
					extra={
						<Image
							width={128}
							alt="logo"
							src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
						/>
					}
				>
					<List.Item.Meta
						title={item.title}
					/>
					<span style={{whiteSpace: 'nowrap',width: '100%', display: 'inline-block', overflow:'hidden', textOverflow: 'ellipsis'}}>{item.content}</span>
				</List.Item>
			)}
		/>
	);
}

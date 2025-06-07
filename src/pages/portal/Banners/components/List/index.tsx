import { List, Image, theme, Badge } from 'antd';
import React, { useState } from 'react';
import css from './index.module.less';
import { IBanner } from '../../hooks/useBanner';

interface IBannerList {
    data?: IBanner[];
    selected: IBanner | null;
    onClick: any;
    loading?: boolean;
}

export default function BannerList(props: IBannerList) {
	const { selected, onClick, data, loading } = props;
	const [pageSize, setPageSize] = useState<any>(4);
	const {
		token: { colorPrimary },
	} = theme.useToken();

	return (
		<List
			loading={loading}
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
				<Badge.Ribbon text={item.status === '1'? '启用' : '禁用'} color={item.status === '1'? 'green' : 'volcano'}>
					<List.Item
						className={item.id === selected?.id ? css.selected : ''}
						style={{
							borderLeftColor: colorPrimary,
							cursor: 'pointer',
						}}
						key={item.title}
						onClick={() => {
							onClick({ ...item, type: 'edit' });
						}}
						extra={<Image width={124} height={70} src={item.url} />}
					>
						<List.Item.Meta title={item.title} />
						<span
							style={{
								whiteSpace: 'nowrap',
								width: '100%',
								display: 'inline-block',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{item.subtitle}
						</span>
					</List.Item>
				</Badge.Ribbon>
			)}
		/>
	);
}

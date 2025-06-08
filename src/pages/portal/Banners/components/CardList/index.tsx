import React from 'react';
import { Card, List, Image, Switch, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface IBannerCardListProps {
    data: any[];
    disableBanner: any;
    enabledBanner: any;
    deleteBanner: any;
    onClick: any;
}
const BannerCardList: React.FC<IBannerCardListProps> = (props) => {
	const { data, disableBanner, enabledBanner, onClick, deleteBanner } = props;
	return (
		<List
			grid={{
				gutter: 16,
				xs: 1,
				sm: 2,
				md: 2,
				lg: 2,
				xl: 2,
				xxl: 3,
			}}
			dataSource={data}
			renderItem={(item) => (
				<List.Item>
					<Card
						size="small"
						key={item.id}
						actions={[
							<EditOutlined
								key="edit"
								onPointerEnterCapture={undefined}
								onPointerLeaveCapture={undefined}
								onClick={() => {
									onClick({ ...item, type: 'edit' });
								}}
							/>,
							<Switch
								key={'switch'}
								checkedChildren="启用"
								unCheckedChildren="禁用"
								checked={item?.status === '1'}
								onChange={(value) => {
									if (!value) {
										disableBanner({
											id: item?.id,
											set: false,
										});
									} else {
										enabledBanner({
											id: item?.id,
											set: false,
										});
									}
								}}
							/>,
							<DeleteOutlined
								key="delete"
								onPointerEnterCapture={undefined}
								onPointerLeaveCapture={undefined}
								style={{ color: 'red' }}
								onClick={() => {
									Modal.confirm({
										type: 'error',
										title: '提示',
										content: '你确定要删除这条Banner配置吗',
										okType: 'danger',
										okButtonProps: {
											type: 'primary',
										},
										onOk: () => {
											return deleteBanner({
												id: item?.id,
											});
										},
									});
								}}
							/>,
						]}
					>
						<Image src={item.url} />
					</Card>
				</List.Item>
			)}
		/>
	);
};

export default BannerCardList;

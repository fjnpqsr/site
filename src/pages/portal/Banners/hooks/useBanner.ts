import { apis } from '@/constant/apis';
import { useEffect, useState } from 'react';
import useRequest from '@/utils/useRequest';
import { message } from 'antd';
import { ISelectedBanner } from '..';

export interface IBanner {
    id?: string;
    link?: string;
    url?: string;
    title?: string;
    subtitle?: string;
	status?:string;
}

const userBannerList = () => {
	const [loading, setLoading] = useState(false);
	const [adding, setAdding] = useState(false);
	const [banners, setBanners] = useState<IBanner[]>([]);
	const { request } = useRequest();
	const [selected, setSelected] = useState<ISelectedBanner|null>(null);
	async function fetchBanners(id?:string) {
		if (!id) {
			setLoading(true);
			setSelected(null);

		}
		const {code, msg, data} = await request(apis.banners.list);
		setLoading(false);

		if (code === '200') {
			setBanners(data || []);
			if (id) {
				setSelected({...data.filter((item: any)=> item.id === id )[0], type: 'edit'});
			}
		} else {
			message.destroy();
			message.error(msg);
		}
	}
	async function addBanner(params: any) {
		setAdding(true);
		const {code, msg} = await request(apis.banners.create, { method: 'post', data: params });
		setAdding(false);
		if (code === '200') {
			message.destroy();
			message.success('新增Banner成功!');
			fetchBanners();
		} else {
			message.destroy();
			message.error(msg);
		}
	}


	async function deleteBanner(params: any) {
		setAdding(true);
		const {code, msg} = await request(`${apis.banners.delete}/${params.id}`, { method: 'delete' });
		setAdding(false);
		if (code === '200') {
			message.destroy();
			message.success('删除Banner成功!');
			fetchBanners();
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	async function disableBanner(params: any) {
		setAdding(true);
		const {code, msg} = await request(`${apis.banners.disable}/${params.id}`, { method: 'post' });
		setAdding(false);
		if (code === '200') {
			message.destroy();
			message.success('禁用Banner成功!');
			fetchBanners(params.id);
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	async function enabledBanner(params: any) {
		setAdding(true);
		const {code, msg} = await request(`${apis.banners.enable}/${params.id}`, { method: 'post' });
		setAdding(false);
		if (code === '200') {
			message.destroy();
			message.success('启用Banner成功!');
			fetchBanners(params.id);
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	async function updateBanner(params: any) {
		setAdding(true);
		const {code, msg} = await request(apis.banners.update, { method: 'put', data: params });
		setAdding(false);
		if (code === '200') {
			message.destroy();
			message.success('编辑Banner成功!');
			fetchBanners(params.id);
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	useEffect(() => {
		fetchBanners();
	}, []);

	return {
		banners,
		loading,
		adding,
		selected, 
		setSelected,
		addBanner,
		updateBanner,
		disableBanner,
		enabledBanner,
		deleteBanner
	};
};

export default userBannerList;

import { apis } from '@/constant/apis';
import { useEffect, useState } from 'react';
import useRequest from '@/utils/useRequest';


export interface IBanner {
    id?: string;
    href?:string;
    image?: string;
    title?:string;
    subTitle?:string;
}

const userBannerList = () => {

	const [loading, setLoading] = useState(false);
	const [banners, setBanners] = useState<IBanner[]>([]);
	const {request} = useRequest();
	async function fetchBanners () {
		setLoading(true);
		const res = await request(apis.banners);
		console.log(res);
		setLoading(false);
		setBanners(res.data);
	}
	useEffect(() => {
		fetchBanners();
	}, []);

	return {banners, loading};
};

export default userBannerList;
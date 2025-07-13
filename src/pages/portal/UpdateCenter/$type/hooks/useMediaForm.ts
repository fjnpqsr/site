import { history, useParams } from '@/.umi/exports';
import { apis } from '@/constant/apis';
import useRequest from '@/utils/useRequest';
import { message } from 'antd';
import { useEffect, useState } from 'react';

const useMediaForm = (init = true) => {
	const { request } = useRequest();
	const [detail, setDetail] = useState<any>(null);
	const [fetching, setFetching] = useState<any>(null);
	const { type = '', id } = useParams();
	async function create(params: any) {
		const { code, msg, data } = await request(apis.rich.create, {
			method: 'post',
			data: {...params, type},
		});
		if (code === '200') {
			message.destroy();
			message.success('保存成功!');
			history.replace(history.location.pathname.replace('create', data));
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	async function update(params: any) {
		const { code, msg } = await request(apis.rich.update, {
			method: 'put',
			data: {...params, type},
		});
		if (code === '200') {
			message.destroy();
			message.success('保存成功!');
			fetchDetail(params.id);
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	async function deleteMedia(params: any) {
		const {id, back = true, callback} = params;
		const { code, msg } = await request(`${apis.rich.delete}/${id}`, {
			method: 'delete',
		});
		if (code === '200') {
			message.destroy();
			message.success('删除成功!');
			if (back) {
				history.back();
			}
			if (callback) {
				callback();
			}
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	async function fetchDetail(id: any) {
		setFetching(true);
		const { code, msg, data } = await request(`${apis.rich.detail}/${id}`);
		setFetching(false);
		if (code === '200') {
			const { projectContent} = JSON.parse(data.json || '{}');
			setDetail({...data, projectContent});
		} else {
			message.destroy();
			message.error(msg);
		}
	}

	useEffect(() => {
		if (init && id && id!=='create') {
			fetchDetail(id);
		}
	}, [id, init]);

	return {
		detail,
		fetching,
		fetchDetail,
		create,
		update,
		deleteMedia,
	};
};

export default useMediaForm;

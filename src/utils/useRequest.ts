import { context } from '@/context/context';
import { message } from 'antd';
import { useContext } from 'react';
import { extend } from 'umi-request';
import {history} from 'umi';


function useRequest () {
	const {  state } = useContext(context);
	const request = extend({
		headers: {
			'Authorization': state.token,
		},
		responseInterceptors: [
			function (response:any) {
				if (response.data.code === 0){
					return Promise.resolve(response.data);
				}
				if (response.data.code === '404') {
					message.error('请先登录');
					history.replace({
						pathname: '/404',
					});
					return Promise.reject(new Error('未登录'));
				} else if (response.data.code === '401') {
					message.error('请先登录');
					history.replace({
						pathname: '/login',
					});
					return Promise.reject(new Error('未登录'));
				} else {
					return Promise.reject(new Error(response.data.description || '请求出错'));
				}
			}

		]
	});
	return {request};
}

export default useRequest;
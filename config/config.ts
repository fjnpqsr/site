/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 11:41:03
 * @LastEditTime: 2022-08-05 15:17:58
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\config\config.ts
 */
import { defineConfig } from 'umi';

export default defineConfig({
	npmClient: 'pnpm',
	title: 'umi 4 learn',
	esbuildMinifyIIFE:true,
	mfsu:false,
	proxy: {
		'/api': {
			target: 'http://http://123.56.154.83/:8082/ ',
			changeOrigin: true,
			pathRewrite: { '^/api': '' },
		},
	},
	dataHub: {
		proxy: {
			'/mock': {hub: 'umi-datahub-test'}
		}
	},
	chainWebpack(config) {
		config.module
			.rule('html')
			.test(/\.(htm|html)$/)
			.use('html-loader')
			.loader('html-loader');
	}
});

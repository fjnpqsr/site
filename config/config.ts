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
	base:'/admin',
	npmClient: 'pnpm',
	title: 'umi 4 learn',
	esbuildMinifyIIFE: true,
	proxy: {
		'/official-website': {
			target: 'http://106.55.59.145:8080/',
			changeOrigin: true,
		},
	},
	chainWebpack(config) {
		config.module
			.rule('html')
			.test(/\.(htm|html)$/)
			.use('html-loader')
			.loader('html-loader');
	},
	links: [{ href: 'https://unpkg.com/@wangeditor/editor@latest/dist/css/style.css', rel: 'stylesheet' }],
	scripts: ['https://unpkg.com/@wangeditor/editor@latest/dist/index.js'],
});

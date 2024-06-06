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
	scripts: [
		'/aliplayer/aliplayer-min.js',
		{
			src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', 
			integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
			crossorigin: ''
		},
		'https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.js',
		'https://unpkg.com/mapbox-gl-leaflet/leaflet-mapbox-gl.js',
		'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-language/v1.0.0/mapbox-gl-language.js'
		
	],
	links: [
		{href: '/aliplayer/skins/default/aliplayer-min.css',rel:'stylesheet'},
		{href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.css',rel:'stylesheet'},
		{
			href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
			rel:'stylesheet',
			integrity:'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
			crossorigin: ''
		},

	],
	chainWebpack(config) {
		config.module
			.rule('html')
			.test(/\.(htm|html)$/)
			.use('html-loader')
			.loader('html-loader');
	}
});

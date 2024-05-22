import { getProxyMiddlewares } from 'datahub-proxy-middleware';
import DataHub from 'macaca-datahub';
import path from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
	const {
		logger: { debug },
	} = api;
	const isBigfish = Boolean(process.env.BIGFISH_VERSION);
	const datahubConfig = {
		port: 5678,
		hostname: '127.0.0.1',
		store: path.join(__dirname, 'data'),
		proxy: {},
		showBoard: true,
		...api.userConfig.dataHub,
	};
	const defaultDatahub = new DataHub({
		port: datahubConfig.port,
	});

	debug('datahubConfig');
	debug(datahubConfig);
	api.describe({
		key: 'dataHub',
		config: {
			default: {},
			schema(joi) {
				return joi.object();
			},
		},
	});
	if (!isBigfish && process.env.NODE_ENV === 'development') {
		// push datahub middlewares
		api.addBeforeMiddlewares(() => getProxyMiddlewares(datahubConfig));
		// start datahub server
		api.onStart(() => {
			defaultDatahub.startServer(datahubConfig).then(() => {
				debug('datahub ready');
				console.log('datahub ready');
				
			});
		});

		// add debugger-board.js into template
		if (datahubConfig.showBoard) {
			api.addHTMLScripts(() => [
				{ src: '/debugger-board.js' },
				{
					content: `
      window._debugger_board_datahub_options = ${JSON.stringify(datahubConfig)};
      window._debugger_board.append(document.body);`,
				},
			]);
		}
	}
};

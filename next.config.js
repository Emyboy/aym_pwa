const withOffline = require('next-offline')
require('dotenv').config();

module.exports = withOffline({
	target: process.env.NEXT_TARGET || 'serverless',
	env: {
		REACT_APP_APP_KEY: process.env.REACT_APP_APP_KEY,
		REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
		REACT_APP_DATABASE_URL: process.env.REACT_APP_DATABASE_URL,
		REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
		REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
		REACT_APP_MESSAGE_SENDER_ID: process.env.REACT_APP_MESSAGE_SENDER_ID,
		REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
		REACT_APP_MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID
	},
	workboxOpts: {
		swDest: 'static/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /[.](png|jpg|ico|css)/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'assets-cache',
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			},
			{
				urlPattern: /^https:\/\/code\.getmdl\.io.*/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'lib-cache'
				}
			},
			{
				urlPattern: /^http.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'http-cache'
				}
			}
		]
	}
})

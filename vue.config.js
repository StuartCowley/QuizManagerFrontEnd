module.exports = {
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.(svg)(\?.*)?$/,
					use: [
						{
							loader: 'html-loader',
							options: {
								minimize: true
							}
						}
					]
				}
			]
		}
	},
	chainWebpack: config => {
		config.module
			.rule('svg')
			.test(() => false)
			.use('file-loader')
	}
}

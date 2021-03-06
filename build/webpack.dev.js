//webpack.dev.js
const path = require('path')
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const ip = require('ip');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HotModuleReplacementPlugin = require('Hot Module Replacement');

module.exports = merge(common.webpackCommon, {
	mode: "development",
	output: {
		publicPath: '/',
		filename: "[name].[hash].js"			//打包后输出文件的文件名
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(process.cwd(), "public"),	//本地服务器所加载的页面所在的目录
		historyApiFallback: true,	//不跳转
		hot: true,					//热更新
		inline: true,				//实时刷新
		host: ip.address(),
		disableHostCheck: true,		//局域网访问
		open: process.platform=='win32' ? 'chrome' : 'google chrome'
	},
	module: {
		rules: [
			{
				test: /\.(htm|html)$/,
				enforce: 'pre',
				use: [{
					loader: 'webpack-remove-blocks',
					options: {
						blocks: [{
							block: 'build',
							start: '<!--',
							end: '-->'
						}, 'build', {
                            block: 'build',
                            start: '//'
                        }]
					}
				}]
			},
			{
				test: /\.js$/,
                enforce: 'pre',
                exclude: /(node_modules|bower_components|\.spec\.js)/,
				use: [{
					loader: 'webpack-remove-blocks',
					options: {
						blocks: ['build', {
                            block: 'build',
                            start: '//'
                        }]
					}
				}]
			},
			...common.cssLoader(false)
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin() //热更新
		// new webpack.DefinePlugin({
		// 	'process.env': JSON.stringify({NODE_ENV: "development"})
		// })
	]
})
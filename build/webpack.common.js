//webpack.common.js
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const srcDir = path.join(process.cwd(), "app");
const distDir = path.join(process.cwd(), "public");

console.log(111)
module.exports = {
	entry: {
		head: path.join(srcDir, "js/head.js"),
		main: path.join(srcDir, "app.js")
	},	//已多次提及的唯一入口文件
	output: {
		path: distDir,	//打包后的文件存放的地方
		filename: "[name].[chunkhash].js"			//打包后输出文件的文件名
	},
	resolve: {
		alias: {
			'@': path.resolve(process.cwd()),
			'@lib': path.resolve(process.cwd(), 'lib'),
			'@common': path.resolve(process.cwd(), 'app/common')
		}
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",	// 支持ES6语法
					options: {
                        presets: [
							["env", { "targets": {"chrome": 55, "browsers": ["last 2 versions"]}}],
							"stage-0",
							"react",
							// "minify"
						],
						plugins: [
							["transform-runtime", {helpers: false, polyfill: false, regenerator: true, moduleName: "babel-runtime"}]
						]
                    }
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
				fallback: "style-loader",
					use: [{
						loader: "css-loader",
						options: {
							// modules: true,
							minimize: true	// CSS压缩
						}
					}, {
						loader: "postcss-loader",
						options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
							plugins: (loader) => [
								require('autoprefixer')(), //CSS浏览器兼容
							]
						}
					}],
				})
			},
			{
				test: /\.(png|jpg|gif|mp3|mp4)$/,
				use: {
					loader: "url-loader?limit=2048&name=img/[name].[hash].[ext]"
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'head',
			template: "html-withimg-loader!" + path.join(srcDir, "index.tmpl.html"),
			chunksSortMode: function (chunk1, chunk2) {
			    var order = ['head', 'main'];
			    var order1 = order.indexOf(chunk1.names[0]);
			    var order2 = order.indexOf(chunk2.names[0]);
			    return order1 - order2;  
			},
			// HTML压缩
			minify: {
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				minifyJS: true,
				minifyCSS: true
			}
		}),
		new ScriptExtHtmlWebpackPlugin({
			sync: /^head/,
			defaultAttribute: 'defer'
		}),
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	jQuery: 'jquery',
		// 	'window.jQuery': 'jquery',
		// 	'window.$': 'jquery'
		// }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new CopyWebpackPlugin([{
			from: path.join(srcDir, 'assets'),
			to: path.join(distDir, 'assets')
		}]),
		new webpack.BannerPlugin('@小玲欢 版权所有，二次开发请保留原作者信息！')
	]
}
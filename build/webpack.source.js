//webpack.dev.js
const path = require('path')
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const srcDir = path.join(process.cwd(), "app");
const distDir = path.join(process.cwd(), "source");


const webpackCommon = {
	entry: {
		head: path.join(srcDir, "head.js"),
		main: path.join(srcDir, "app.js")
	},	//已多次提及的唯一入口文件
	output: {
		path: distDir,	//打包后的文件存放的地方
		filename: "[name].js"			//打包后输出文件的文件名
	},
	resolve: {
		alias: {
			'@': path.resolve(process.cwd()),
			'@common': path.resolve(process.cwd(), 'app/common'),
			'@pages': path.resolve(process.cwd(), 'app/pages'),
			'@css': path.resolve(process.cwd(), 'app/css'),
			'@images': path.resolve(process.cwd(), 'app/images'),
			'@assets': path.resolve(process.cwd(), 'app/assets')
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
							["transform-runtime", {helpers: false, polyfill: false, regenerator: true, moduleName: "babel-runtime"}],
							["transform-decorators-legacy"]
						]
                    }
				},
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: {
					loader: "url-loader?limit=2048&name=img/[name].[ext]"
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
			// minify: {
			// 	collapseWhitespace: true,
			// 	collapseBooleanAttributes: true,
			// 	removeComments: true,
			// 	removeEmptyAttributes: true,
			// 	removeScriptTypeAttributes: true,
			// 	removeStyleLinkTypeAttributes: true,
			// 	minifyJS: true,
			// 	minifyCSS: true
			// }
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
		// CSS提取
		new ExtractTextPlugin("[name].css"),
		// new webpack.optimize.OccurrenceOrderPlugin(),
		new CopyWebpackPlugin([{
			from: path.join(srcDir, 'assets'),
			to: path.join(distDir, 'assets')
		}]),
		new webpack.BannerPlugin('@小玲欢 版权所有，二次开发请保留原作者信息！')
	]
}

const cssLoader = (minimize = false) => [{
	test: /\.css$/,
	use: ExtractTextPlugin.extract({
	fallback: "style-loader",
		use: [{
			loader: "css-loader",
			options: {
				// modules: true,
				minimize: minimize	// CSS压缩
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
}, {
	test: /\.less$/,
	use: ExtractTextPlugin.extract({
	fallback: "style-loader",
		use: [{
			loader: "css-loader",
			options: {
				// modules: true,
				minimize: minimize	// CSS压缩
			}
		}, {
			loader: "postcss-loader",
			options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
				plugins: (loader) => [
					require('autoprefixer')(), //CSS浏览器兼容
				]
			}
		}, {
			loader: 'less-loader',
			options: {
				// modifyVars: {
				// 	"brand-primary": "red"
				// },
				javascriptEnabled: true
			}
		}],
	})
	// include: /node_modules/
}]

module.exports = merge(webpackCommon, {
	mode: "development",
	// entry: {
	// 	common:["react", "react-dom"]
	// },
	devtool: 'hidden-source-map',
	module: {
		rules: [
			{
				test: /\.(htm|html)$/,
				enforce: 'pre',
				use: [{
					loader: 'webpack-remove-blocks',
					options: {
						blocks: [{
							block: 'debug',
							start: '<!--',
							end: '-->'
						}, 'debug', {
                            block: 'debug',
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
						blocks: ['debug', {
                            block: 'debug',
                            start: '//'
                        }]
					}
				}]
			},
			...cssLoader(false)
		]
	},
	plugins: [
		// 共同模块
		// new webpack.optimize.SplitChunksPlugin({
		// 	chunks: "all",
		// 	minSize: 5000,
		// 	minChunks: 1,
		// 	maxAsyncRequests: 5,
		// 	maxInitialRequests: 3,
		// 	name: true,
		// 	cacheGroups: {
		// 		default: {
		// 			minChunks: 2,
		// 			priority: -20,
		// 			reuseExistingChunk: true,
		// 		},
		// 		commons: {
        //             name: "commons",
        //             chunks: "initial",
        //             minChunks: 2,
		// 			priority: -10
        //         }
		// 	}
		// }),
		new CleanWebpackPlugin(
		    //匹配删除的文件
		    [
		        distDir + '/*.css',
		        distDir + '/*.js',
		        distDir + '/*.map'
		    ],
		    {
		        root: process.cwd(),       　　　　　　　　　　//根目录
		        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
		        dry:      false        　　　　　　　　　　//启用删除文件
		    }
		)
	]
})
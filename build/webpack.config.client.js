/**
 * Created by Maktub on 2018/1/18
 */
const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public/'
	},
	module: {
		rules: [
			{
				enforce: "pre", // 编译之前检测
				test: /.(js|jsx)/,
				loader: "eslint-loader",
				exclude: [
					path.resolve(__dirname, '../node_modules')
				]
			},
			{
				test: /.jsx$/,
				loader: "babel-loader"
			},
			{
				test: /.js$/,
				loader: "babel-loader",
				exclude: path.join(__dirname, '../node_modules')
			}
		]
	},
	plugins: [
		new HTMLPlugin({
			template: path.join(__dirname, '../client/template.html')
		})
	]
};

if (isDev) {
	config.entry = {
		app: [
			'react-hot-loader/patch',
			path.join(__dirname, '../client/app.js')
		]
	};
	config.devServer = {
		host: '0.0.0.0',
		port: '8888',
		contentBase: path.join(__dirname, '../dist'),
		hot: true,
		publicPath: "/public/",
		overlay: {
			errors: true
		},
		historyApiFallback: {
			index: '/public/index.html'
		}
	};
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config;
// entry ->  应用入口
// filename -> hash变化，才会刷新，更少的刷新
// publicPath -> 为的是nigx区分更方便
// app.hash.js
// /public/app.hash.js
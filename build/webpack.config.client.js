/**
 * Created by Maktub on 2018/1/18
 */
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public'
	},
	module: {
		rules: [
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
	config.devServer = {
		host: '0.0.0.0',
		port: '8888',
		contentBase: path.join(__dirname, '../dist'),
		// hot: true,
		publicPath: "/public",
		overlay: {
			errors: true
		},
		historyApiFallback: {
			index: '/public/index.html'
		}
	}
}

module.exports = config;
// entry ->  应用入口
// filename -> hash变化，才会刷新，更少的刷新
// publicPath -> 为的是nigx区分更方便
// app.hash.js
// /public/app.hash.js
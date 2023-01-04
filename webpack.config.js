const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
	mode: 'development',
	entry: {
		index: './public/index.js',
	},
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "public/index.html",
		}),
		new HtmlWebpackPlugin({
			filename: "second.html",
			template: "public/second.html",
			chunks: [],
		})
	],
	resolve: {
		alias: {
			shared: path.resolve(__dirname, "shared/")
		}
	},
	output: {
		path: path.resolve(__dirname, 'public_build'),
		clean: true,
		publicPath: '/',
	},
};
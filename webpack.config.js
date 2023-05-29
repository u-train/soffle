const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = [
	"index.html",
	"second.html"
]

module.exports = {
	mode: 'development',
	entry: {
		index: './public/index.js',
		second: './public/second.js',
	},
	devtool: 'inline-source-map',
	plugins: entries.map((entry) => new HtmlWebpackPlugin({ inject: false, filename: entry, template: "public/" + entry })),
	resolve: {
		alias: {
			shared: path.resolve(__dirname, "shared/")
		},
		fallback: {
			"stream": require.resolve("stream-browserify"),
			"crypto": require.resolve("crypto-browserify"),
			"buffer": require.resolve("buffer")
		}
	},
	output: {
		path: path.resolve(__dirname, 'public_build'),
		clean: true,
		publicPath: '/',
	},
};
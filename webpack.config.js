var path = require('path');
var version = require('./package.json').version;
var webpack = require('webpack');

module.exports = {
	entry: {
		jslottery: './src/jslottery.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		library: 'jslottery',
		libraryTarget:'umd',
		publicPath: '/assets/'
	},
	plugins: [
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(version)
		})
	]
};
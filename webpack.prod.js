var path = require('path');
var version = require('./package.json').version;
var webpack = require('webpack');

module.exports = {
	entry: {
		jslottery: './src/jslottery.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].min.js',
		library: 'jslottery',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
				test:/\.(js)$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				query:{
					"presets":['es2015']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(version)
		})
	]
};
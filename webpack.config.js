const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		app: './app.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015'] }
				}],
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.(sass|s?css)$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js'
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [ autoprefixer ]
			}
		}),
		new HtmlPlugin({
			template: './index.html',
			inject: 'body',
			minify: false
		}),
		new CopyPlugin([
			{from: '../assets', to: 'assets'}
		])
	],
	devtool: 'source-map'
};

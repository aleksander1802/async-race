const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
	const envPath = `.env.${env.mode || 'production'}`;
	const envVariables =
		require('dotenv').config({ path: envPath }).parsed || {};

	return {
		entry: path.resolve(__dirname, 'src', 'index.ts'),
		mode: 'production',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},
		resolve: {
			extensions: ['.ts', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.(woff|woff2|ttf|otf|eot)$/,
					type: 'asset/resource',
					generator: {
						filename: './assets/fonts/[name][ext]',
					},
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				filename: 'index.html',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
				},
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new Dotenv({
				path: envPath,
			}),
			
			new CopyWebpackPlugin({
				patterns: [{ from: 'src/assets/images', to: 'assets/images' }],
			}),
		],
	};
};

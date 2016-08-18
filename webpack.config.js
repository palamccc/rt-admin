'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
const plugins = [];

plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${NODE_ENV}"`,
      BROWSER: true,
    },
  })
);

if (!isDev) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
    })
  );
}

plugins.push(new HtmlWebpackPlugin({ template: 'src/index.html' }));
// plugins.push(new ExtractTextPlugin('index.css?[hash]', { allChunks: true }));

const cssLoaderQuery = [
  'sourceMap',
  'modules',
  'importLoaders=1', // this will actually skip next 1 loader (postcss-loader) for all @imports
  'localIdentName=[name]-[local]-[hash:base64:3]',
];

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: './static',
    filename: 'index.js?[hash]',
    chunkFilename: 'chunk.[id].js?[hash]',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /.*jsx?$/,
        exclude: /node_modules/,
        loaders: (isDev ? ['react-hot-loader'] : [])
                    .concat(['babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react']),
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader',
          `css-loader?${cssLoaderQuery.join('&')}`,
          'postcss-loader',
          'sass-loader'],
        // loader: ExtractTextPlugin.extract('style-loader', [
        //   `css-loader?${cssLoaderQuery.join('&')}`,
        //   'postcss-loader',
        //   'sass-loader']),
      },
      {
        test: /\.(gif|jpg|png)$/,
        loader: 'file-loader',
        query: {
          name: './img/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        query: {
          name: './fonts/[name].[ext]?[hash]',
        },
      },
    ],
  },
  sassLoader: { data: '@import "./src/theme/_config.scss";' },
  postcss: [autoprefixer],
  plugins,
};

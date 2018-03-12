const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const resolve = file => require('path').resolve(__dirname, file);

var extractPlugin = ExtractTextPlugin.extract({
  use: [
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'stylus-loader', options: { sourceMap: true } }
  ],
});

module.exports = merge(baseWebpackConfig, {
  devtool: '#source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: require.resolve('quill'),
        use: [{
          loader: 'expose-loader',
          options: 'Quill',
        }],
      },
      {
        test: require.resolve('moment'),
        use: [{
          loader: 'expose-loader',
          options: 'moment',
        }],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                stylus: extractPlugin,
              },
            },
          },
          'eslint-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        use: extractPlugin,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // Uncomment this to analyze library
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.baseUrl': "'https://chameleon-playground.nsoft.com/'",
    }),
  ],
  performance: {
    hints: false,
  },
});

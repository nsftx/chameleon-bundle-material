require('dotenv').config();
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const resolve = file => require('path').resolve(__dirname, file);

const extractPlugin = ExtractTextPlugin.extract({
  use: [
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    },
    'stylus-loader',
  ],
});

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  entry: ['babel-polyfill', './dev/index.js'],
  output: {
    filename: '[name].js',
    path: resolve('../dev'),
    publicPath: '/dev/',
    library: 'Chameleon'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      chameleon: resolve('../src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
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
        loaders: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              stylus: extractPlugin,
            },
          },
        }, 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        loaders: extractPlugin,
        exclude: /node_modules/,
      },
    ],
  },
  performance: {
    hints: false
  },
  devServer: {
    contentBase: resolve('../dev'),
    publicPath: '/assets/',
    host: 'localhost',
    port: '8800',
    disableHostCheck: true,
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'development'"
    }),
  ],
});

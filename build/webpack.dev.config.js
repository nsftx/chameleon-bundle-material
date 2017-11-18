require('dotenv').config();
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

module.exports = {
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
        test: /\.vue$/,
        loaders: [{
          loader: 'vue-loader',
        }, 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
    ]
  },
  performance: {
    hints: false
  },
  devServer: {
    contentBase: resolve('../dev'),
    publicPath: '/dev/',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8080',
    disableHostCheck: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'development'"
    }),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ]
}

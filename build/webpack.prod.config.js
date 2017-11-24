const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = file => require('path').resolve(__dirname, file);

var extractPlugin = ExtractTextPlugin.extract({
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
  devtool: '#source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'Chameleon'
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
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
  performance: {
    hints: false,
  },
});

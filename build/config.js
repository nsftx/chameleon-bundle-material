const baseProd = require('./webpack.prod.config');
const baseDev = require('./webpack.dev.config');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const version = process.env.VERSION || require('../package.json').version;

const resolve = file => require('path').resolve(__dirname, file);

const builds = {
  development: {
    config: {
      output: {
        filename: 'index.js',
      },
      plugins: [
        new ExtractTextPlugin('index.css'),
      ],
    },
  },
  production: {
    config: {
      output: {
        filename: 'index.min.js',
      },
      plugins: [
        new ExtractTextPlugin('index.min.css'),
      ],
    },
    env: 'production',
  },
  lite: {
    config: {
      entry: {
        app: './src/index.lite.js'
      },
      output: {
        filename: 'index.lite.js',
      },
      plugins: [
        new ExtractTextPlugin('index.lite.css'),
      ],
    },
    env: 'production',
  },
  meta: {
    config: {
      entry: {
        app: './src/index.meta.js'
      },
      output: {
        filename: 'index.meta.js',
        library: '__CHAMELEON_MATERIAL_META__',
      },
    },
    env: 'production',
  },
  playground: {
    config: {
      output: {
        filename: '[name].js',
        path: resolve('../dev/assets'),
      },
    },
    env: 'production',
  },
};

const genConfig = (name, opts) => {
  const config = webpackMerge({}, name === 'playground' ? baseDev : baseProd, opts.config);

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': opts.env || 'development'
    }),
  ]);

  if (opts.env) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
      }),
      new OptimizeJsPlugin({
        sourceMap: false,
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          postcssZindex: false,
        },
        canPrint: false,
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ]);
  }

  return config;
};

const target = process.env.TARGET;
if (target) {
  module.exports = genConfig(target, builds[target]);
} else {
  module.exports = Object.keys(builds).map(name => genConfig(name, builds[name]));
}

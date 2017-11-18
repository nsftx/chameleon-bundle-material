const base = require('./webpack.prod.config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeJsPlugin = require('optimize-js-plugin');
const version = process.env.VERSION || require('../package.json').version;

const builds = {
  development: {
    config: {
      output: {
        filename: 'chameleon.js',
        libraryTarget: 'umd'
      },
    }
  },
  production: {
    config: {
      output: {
        filename: 'chameleon.min.js',
        libraryTarget: 'umd'
      },
    },
    env: 'production'
  },
}

function genConfig(opts) {
  const config = merge({}, base, opts.config)

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': opts.env || 'development'
    })
  ])

  if (opts.env) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false
      }),
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ])
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  module.exports = Object.keys(builds).map(name => genConfig(builds[name]))
}

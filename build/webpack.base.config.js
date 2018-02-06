const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const resolve = file => require('path').resolve(__dirname, file);

module.exports = {
  output: {
    library: '__CHAMELEON_MATERIAL__',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '@meta': resolve('../src/index.meta'),
      '@namespace': resolve('../src/index.namespace'),
      '@components': resolve('../src/components'),
      '@mixins': resolve('../src/mixins'),
      '@validators': resolve('../src/validators'),
      'style': resolve('../src/style'),
    }
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    }),
    new LodashModuleReplacementPlugin({
      shorthands: true,
      collections: true,
    }),
  ],
};

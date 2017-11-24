const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const resolve = file => require('path').resolve(__dirname, file);

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '@components': resolve('../src/components'),
      '@mixins': resolve('../src/mixins'),
      '@validators': resolve('../src/validators'),
    }
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    })
  ],
};

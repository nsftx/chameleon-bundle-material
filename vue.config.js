/* eslint import/no-extraneous-dependencies: off */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const os = require('os');
const packageConfig = require('./package.json');

const bundleName = packageConfig.chameleon.bundle.toUpperCase();
const nameIndex = process.argv.indexOf('--name');
const libName = process.argv[nameIndex + 1];
const isMeta = libName.indexOf('meta') >= 0;
const defaultParallelism = os.cpus().length - 1;

const globalSuffix = isMeta ? '_META' : '';

const resolve = configPath => path.resolve(__dirname, configPath);
let outputDir;
switch (process.env.CHM_TARGET) {
  case 'lib':
    outputDir = resolve('./dist', process.env);
    break;
  case 'components':
    outputDir = resolve('./deploy-components', process.env);
    break;
  case 'playground':
    outputDir = resolve('./deploy-dist', process.env);
    break;
  default:
    outputDir = resolve('./dist', process.env);
}

module.exports = {
  lintOnSave: true,
  outputDir,
  transpileDependencies: [
    '@nsoft/chameleon-sdk',
  ],
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/style/main.scss"',
      },
      scss: {
        data: '@import "~@/style/main.scss";',
      },
    },
    // Separate css from bundle
    extract: false,
  },
  chainWebpack: (wConfig) => {
    wConfig
      .when(process.env.NODE_ENV === 'production'
        && (process.env.CHM_TARGET === 'lib' || process.env.CHM_TARGET === 'components'), (config) => {
        config.externals({ vuetify: 'Vuetify', vue: 'vue' });
        config.output.libraryExport('default');
        config.output.library(`__CHAMELEON_${bundleName}${globalSuffix}__`);
      });

    wConfig.module.rule('eslint').use('eslint-loader')
      .tap(opts => ({ ...opts, emitWarning: false }));

    wConfig
      .when(process.env.NODE_ENV !== 'production', (config) => {
        config.plugin().use(new BundleAnalyzerPlugin());
      });
  },
  parallel: process.env.CI ? false : defaultParallelism,
};

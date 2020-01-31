/* eslint import/no-extraneous-dependencies: off */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
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
  default:
    outputDir = resolve('./deploy-dist', process.env);
}

const elementTarget = process.env.CHM_TARGET !== 'components'
  ? '../Element/index.js' : '../Element/index.component.js';

module.exports = {
  lintOnSave: true,
  outputDir,
  transpileDependencies: [
    '@nsoft/chameleon-sdk',
  ],
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
    // Depending on build target use Element index file
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /..\/Element/,
        elementTarget,
      ),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/style/main.scss"',
      },
      scss: {
        data: '@import "~@/style/main.scss";',
      },
    },
    // Separate or not, css from bundle
    extract: process.env.CHM_TARGET !== 'components',
  },
  chainWebpack: (wConfig) => {
    wConfig
      .when(process.env.NODE_ENV === 'production' && (process.env.CHM_TARGET === 'lib'), (config) => {
        config.externals({ vuetify: 'Vuetify', vue: 'Vue' });
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

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

module.exports = {
  lintOnSave: true,
  outputDir: process.env.CHM_TARGET === 'lib'
    ? resolve('./dist', process.env) : resolve('./deploy-dist', process.env),
  transpileDependencies: [
    '@nsoft/chameleon-sdk',
  ],
  chainWebpack: (wConfig) => {
    wConfig
      .when(process.env.NODE_ENV === 'production' && process.env.CHM_TARGET === 'lib', (config) => {
        config.output.library(`__CHAMELEON_${bundleName}${globalSuffix}__`);
        config.output.libraryExport('default');

        config.externals({ vuetify: 'Vuetify', vue: 'Vue' });
      });

    wConfig.module.rule('eslint').use('eslint-loader')
      .tap(opts => ({ ...opts, emitWarning: false }));
  },
  parallel: process.env.CI ? false : defaultParallelism,
};

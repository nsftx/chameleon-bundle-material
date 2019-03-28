const packageConfig = require('./package.json');

const bundleName = packageConfig.chameleon.bundle.toUpperCase();
const nameIndex = process.argv.indexOf('--name');
const libName = process.argv[nameIndex + 1];
const isMeta = libName.indexOf('meta') >= 0;

const globalSuffix = isMeta ? '_META' : '';

module.exports = {
  lintOnSave: true,
  transpileDependencies: [
    '@nsoft/chameleon-sdk',
  ],
  chainWebpack: (wConfig) => {
    wConfig
      .when(process.env.NODE_ENV === 'production', (config) => {
        config.output.library(`__CHAMELEON_${bundleName}${globalSuffix}__`);
        config.output.libraryExport('default');

        config.externals({ vuetify: 'Vuetify', vue: 'Vue' });
      });
  },
};

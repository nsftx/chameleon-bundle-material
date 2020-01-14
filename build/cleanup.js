const fs = require('fs');
const path = require('path');
const { each } = require('lodash');

const files = fs.readdirSync(path.join(__dirname, '../dist'));
each(files, (file) => {
  const nameParts = file.split('.');
  const metaIndex = nameParts.indexOf('meta');
  const umdIndex = nameParts.indexOf('umd');

  if (umdIndex >= 0) {
    nameParts.splice(umdIndex, 1);
  }

  const cssIndex = nameParts.indexOf('css');
  const minIndex = nameParts.indexOf('min');

  if (metaIndex >= 0) {
    nameParts.splice(minIndex, 1);
  }

  if (cssIndex >= 0) {
    nameParts.splice(cssIndex, 0, 'min');
  }

  fs.renameSync(path.join(__dirname, '../dist', file), path.join(__dirname, '../dist', nameParts.join('.')));
});

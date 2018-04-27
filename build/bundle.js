const fs = require('fs');
const path = require('path');
const zip = new require('node-zip')();
const { each } = require('lodash');
const manifest = require('./manifest.json');

const resolveDist = filePath => path.join(__dirname, '../dist/', filePath);
const resolveSrc = filePath => path.join(__dirname, '../src/', filePath);

zip.file('manifest.json', fs.readFileSync('./build/manifest.json'));

if (manifest.styles) {
  each(manifest.styles, (style) => {
    zip.file(style, fs.readFileSync(resolveDist(style)));
  });
}

if (manifest.scripts) {
  each(manifest.scripts, (scriptConfig) => {
    zip.file(scriptConfig.script, fs.readFileSync(resolveDist(scriptConfig.script)));
  });
}

if (manifest.helpPath) {
  const helpPathSrc = resolveSrc(manifest.helpPath);
  if (fs.existsSync(helpPathSrc)) {
    const helpFiles = fs.readdirSync(helpPathSrc);
    each(helpFiles, (helpFile) => {
      zip.file(`help/${helpFile}`, fs.readFileSync(`${helpPathSrc}/${helpFile}`));
    });
  }
}

const data = zip.generate({
  base64: false,
  compression: 'DEFLATE',
});

fs.writeFileSync('./dist/bundle.zip', data, 'binary');
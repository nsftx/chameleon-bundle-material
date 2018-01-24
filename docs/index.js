const jsdoc2md = require('jsdoc-to-markdown');
const util = require('util');
const fs = require('fs');
const path = require('path');

const writeFile = util.promisify(fs.writeFile);
const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

const directories = getDirectories('src/components');
directories.forEach((directory) => {
  const componentName = directory.split('/').pop();
  jsdoc2md.render({ files: `${directory}/*.js` }).then((result) => {
    if (!result) return;
    writeFile(path.resolve(__dirname, `${componentName}.md`), result).catch((error) => {
      console.log('ERROR', error);
    });
  });
});

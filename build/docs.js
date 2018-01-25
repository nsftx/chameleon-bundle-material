const jsdoc2md = require('jsdoc-to-markdown');
const util = require('util');
const fs = require('fs');
const path = require('path');

const parseTemplate = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);

const writeFile = util.promisify(fs.writeFile);
const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

// Mandatory front matter template for docs
// eslint-disable-next-line
const docTemplate = '---\ntitle: "${componentFullName}"\ndate: ${date}\ndraft: false\n---';
const directories = getDirectories('src/components');

directories.forEach((directory) => {
  const componentName = directory.split('/').pop();

  // Get each doc template data necessary for content organization
  const templateData = jsdoc2md.getTemplateDataSync({
    files: `${directory}/*.js`,
    'no-cache': true,
  });

  if (!templateData[0] || !templateData[0].customTags) return;

  const componentData = templateData[0];
  const group = templateData[0].customTags.find(item => item.tag === 'group');
  const componentGroup = group.value;

  jsdoc2md.render({
    files: `${directory}/*.js`,
    separators: true,
    'no-cache': true,
  }).then((result) => {
    if (!result || !result.length) return;

    // Construct path to sibling directory chameleon-docs
    const basePath = path.dirname(__dirname).split('chameleon-vuetify')[0];
    const docPath = path.resolve(`${basePath}/chameleon-docs/content/vuetify/${componentGroup}`, `${componentName}.md`);

    // Populate front matter template
    const docHeader = parseTemplate(docTemplate, {
      componentFullName: `${componentData.name} - ${componentData.typicalname}`,
      date: new Date().toISOString(),
    });

    writeFile(docPath, `${docHeader}\n${result}`).catch((error) => {
      console.log('ERROR', error);
    });
  });
});

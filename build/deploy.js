const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { assign } = require('lodash');
const FormData = require('form-data');
const manifest = require('./manifest.json');

const deployEndpoint = process.env.NODE_ENV === 'production'
  ? 'https://application-api.chameleon.nsoft.cloud/bundles'
  : 'https://api.staging-chameleon.nsoft.cloud/bundles';
const deployMethod = manifest.version > 1 ? 'put' : 'post';

const resolveDist = filePath => path.join(__dirname, '../dist/', filePath);

console.log('Deploying bundle ...');

const data = fs.createReadStream(resolveDist('bundle.zip'));
const form = new FormData();
form.append('bundle', data, 'bundle.zip');

axios[deployMethod](deployEndpoint, form, {
  headers: assign({
    authorization: `Basic ${process.argv[2]}`,
  }, form.getHeaders()),
}).then((response) => {
  console.log('Successfully deployed bundle =>', JSON.stringify(response.data));
}).catch((error) => {
  console.log('error ', error);
  const result = error.response.data;
  const message = result.message || result;
  console.log('Error deploying bundle =>', JSON.stringify(message));
});

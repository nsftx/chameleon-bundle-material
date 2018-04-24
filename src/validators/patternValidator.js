import _ from 'lodash';

export default (config, value, pattern) => {
  const skip = _.isNil(value) || _.isNil(pattern);
  const isValid = skip || new RegExp(pattern).test(value);

  return isValid ? true : config.message;
};

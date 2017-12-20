import _ from 'lodash';

export default (definition, value, pattern) => {
  const skip = _.isNil(value) || _.isNil(pattern);
  const isValid = skip || new RegExp(pattern).test(value);

  return isValid ? true : definition.message;
};

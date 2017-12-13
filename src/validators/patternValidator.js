import _isNil from 'lodash/isNil';

export default (definition, value, pattern) => {
  const skip = _isNil(value) || _isNil(pattern);
  const isValid = skip || new RegExp(pattern).test(value);

  return isValid ? true : definition.message;
};

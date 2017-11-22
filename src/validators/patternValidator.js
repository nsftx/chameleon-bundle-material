import _isNull from 'lodash/isNull';
import _isUndefined from 'lodash/isUndefined';

export default (definition, value, pattern) => {
  const skip = _isNull(value) || _isUndefined(value) || _isNull(pattern) || _isUndefined(pattern);
  const isValid = skip || new RegExp(pattern).test(value);

  return isValid ? true : definition.message;
};

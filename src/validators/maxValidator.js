import _isNumber from 'lodash/isNumber';

export default (definition, value, limit) => {
  const isInRange = _isNumber(value) && Number(value) <= limit;
  return isInRange ? true : definition.message;
};

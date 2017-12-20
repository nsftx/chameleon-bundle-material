import _ from 'lodash';

export default (definition, value, limit) => {
  const isInRange = _.isNumber(value) && Number(value) <= limit;
  return isInRange ? true : definition.message;
};

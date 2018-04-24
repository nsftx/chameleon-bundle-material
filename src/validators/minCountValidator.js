import _ from 'lodash';
import validator from 'validator';

export default (config, value, limit) => {
  const isEmpty = validator.isEmpty(value);
  const length = isEmpty ? 0 : _.split(value, ',').length;
  return length >= limit ? true : config.message;
};

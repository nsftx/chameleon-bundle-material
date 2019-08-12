import { split } from 'lodash';
import { isEmpty } from 'validator/lib/isEmpty';

export default (config, value, limit) => {
  const length = isEmpty(value) ? 0 : split(value, ',').length;
  return length <= limit ? true : config.message;
};

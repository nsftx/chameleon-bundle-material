import { isNil } from 'lodash';

export default (config, value, pattern) => {
  const skip = isNil(value) || isNil(pattern);
  const isValid = skip || pattern.test(value);

  return isValid ? true : config.message;
};

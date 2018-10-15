import { isNil } from 'lodash';

export default (config, value, pattern) => {
  const skip = isNil(value) || isNil(pattern);
  const isValid = skip || new RegExp(pattern).test(value);

  return isValid ? true : config.message;
};

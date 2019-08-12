import isLength from 'validator/lib/isLength';

export default (config, value, limit) => {
  const isInRange = isLength(value, { min: limit });
  return isInRange ? true : config.message;
};

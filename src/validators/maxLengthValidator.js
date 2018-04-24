import validator from 'validator';

export default (config, value, limit) => {
  const isInRange = validator.isLength(value, { max: limit });
  return isInRange ? true : config.message;
};

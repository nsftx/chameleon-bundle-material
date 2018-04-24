import validator from 'validator';

export default (config, value, limit) => {
  const isInRange = validator.isInt(value) && Number(value) >= limit;
  return isInRange ? true : config.message;
};

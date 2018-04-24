import validator from 'validator';

export default (config, value) => {
  const isInteger = validator.isNumeric(value);
  return isInteger ? true : config.message;
};

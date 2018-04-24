import validator from 'validator';

export default (config, value) => {
  const isEmpty = validator.isEmpty(value);
  return isEmpty ? config.message : true;
};

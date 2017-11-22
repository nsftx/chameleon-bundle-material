import validator from 'validator';

export default (definition, value) => {
  const isInteger = validator.isNumeric(value);
  return isInteger ? true : definition.message;
};

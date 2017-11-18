import validator from 'validator';

export default (definition, value) => {
  const isEmpty = validator.isEmpty(value);
  return isEmpty ? definition.message : true;
};

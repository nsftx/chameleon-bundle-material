import validator from 'validator';

export default (definition, value, limit) => {
  const isInRange = validator.isLength(value, { min: limit });
  return isInRange ? true : definition.message;
};

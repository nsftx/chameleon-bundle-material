import validator from 'validator';

export default (definition, value, limit) => {
  const isInRange = validator.isLength(value, { max: limit });
  return isInRange ? true : definition.message;
};

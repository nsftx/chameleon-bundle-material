import validator from 'validator';

export default (definition, value, limit) => {
  const isInRange = validator.isInt(value) && Number(value) >= limit;
  return isInRange ? true : definition.message;
};

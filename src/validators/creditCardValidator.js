import validator from 'validator';

export default (definition, value) => {
  const isCreditCard = validator.isCreditCard(value);
  return isCreditCard ? true : definition.message;
};

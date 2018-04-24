import validator from 'validator';

export default (config, value) => {
  const isCreditCard = validator.isCreditCard(value);
  return isCreditCard ? true : config.message;
};

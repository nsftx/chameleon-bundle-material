import validator from 'validator';
// TODO: Set this globaly for lib
import locale from '../locale/current';

export default (value, field) => {
  const isCreditCard = validator.isCreditCard(value);
  return isCreditCard ? true : locale.getMessage(field.name)(field.label);
};

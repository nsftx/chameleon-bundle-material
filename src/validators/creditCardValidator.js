import validator from 'validator';
// TODO: Set this globaly for lib
import locale from '../locale/en';

export default (value, field) => {
  const isCreditCard = validator.isCreditCard(value);
  return isCreditCard ? true : locale.messages[field.name](field.label);
};

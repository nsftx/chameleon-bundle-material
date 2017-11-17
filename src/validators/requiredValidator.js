import validator from 'validator';
// TODO: Set this globaly for lib
import locale from '../locale/en';

export default (value, field) => {
  const isEmpty = validator.isEmpty(value);
  return isEmpty ? locale.messages[field.name](field.label) : true;
};

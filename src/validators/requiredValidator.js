import validator from 'validator';
// TODO: Set this globaly for lib
import locale from '../locale/current';

export default (value, field) => {
  const isEmpty = validator.isEmpty(value);
  return isEmpty ? locale.getMessage(field.name)(field.label) : true;
};

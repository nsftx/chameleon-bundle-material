import isNumeric from 'validator/lib/isNumeric';

export default (config, value) => (isNumeric(value) ? true : config.message);

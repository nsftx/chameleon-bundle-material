import isEmpty from 'validator/lib/isEmpty';

export default (config, value) => (isEmpty(value) ? config.message : true);

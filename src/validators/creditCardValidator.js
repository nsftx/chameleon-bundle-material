import isCreditCard from 'validator/lib/isCreditCard';

export default (config, value) => (isCreditCard(value) ? true : config.message);

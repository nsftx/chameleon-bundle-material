import { isURL } from 'validator/lib/isURL';

export default (config, value) => {
  const settings = {
    protocols: ['http', 'https'],
    require_protocol: true,
  };

  return isURL(value, settings) ? true : config.message;
};

import isURL from 'validator/lib/isURL';

export default (config, value) => {
  const settings = {
    protocols: ['http', 'https'],
    require_protocol: true,
  };

  const isUrl = isURL(value, settings);
  return isUrl ? true : config.message;
};

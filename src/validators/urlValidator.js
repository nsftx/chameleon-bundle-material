import validator from 'validator';

export default (config, value) => {
  const settings = {
    protocols: ['http', 'https'],
    require_protocol: true,
  };

  const isUrl = validator.isURL(value, settings);
  return isUrl ? true : config.message;
};

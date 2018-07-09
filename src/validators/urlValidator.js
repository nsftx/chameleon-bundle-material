import validator from 'validator';

export default (value) => {
  const config = {
    protocols: ['http', 'https'],
    require_protocol: true,
  };

  const isUrl = validator.isURL(value, config);
  return isUrl;
};

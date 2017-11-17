// Inspiration at:
// https://github.com/baianat/vee-validate/blob/master/locale/en.js
const messages = {
  default: field => `The ${field} value is not valid.`,
  required: field => `The ${field} field is required.`,
  creditCard: field => `The ${field} field is invalid credit card.`,
};

const locale = {
  name: 'en',
  messages,
};

export default locale;

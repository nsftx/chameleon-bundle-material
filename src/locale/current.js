import locale from './en';

// TODO: Move this to global
export default {
  getMessage(key) {
    return locale.messages[key] || locale.messages.default;
  },
};

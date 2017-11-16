import textParser from './textParser';

export default {
  parse(definition) {
    switch (definition.type) {
      case 'text':
        return textParser.parse(definition);
      default:
        return textParser.parse(definition);
    }
  },
};

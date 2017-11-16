import textParser from './textParser';

export default {
  parse(definition, createElement, context) {
    switch (definition.type) {
      case 'text':
        return textParser.parse(definition, createElement, context);
      default:
        return textParser.parse(definition, createElement, context);
    }
  },
};

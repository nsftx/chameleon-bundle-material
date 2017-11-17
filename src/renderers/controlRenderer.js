import textRenderer from './textRenderer';
import validator from '../validators/basicValidator';

export default {
  render(definition, createElement, context) {
    switch (definition.type) {
      case 'text':
        return textRenderer.render(
          definition,
          createElement,
          context,
          validator,
        );
      default:
        return textRenderer.render(
          definition,
          createElement,
          context,
          validator,
        );
    }
  },
};

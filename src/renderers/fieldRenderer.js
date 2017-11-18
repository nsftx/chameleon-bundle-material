import textRenderer from './textRenderer';
import validator from '../validators/basicValidator';

export default {
  render(definition, validators, createElement, context) {
    switch (definition.type) {
      case 'text':
        return textRenderer.render(
          definition,
          createElement,
          context,
          validator,
          validators,
        );
      default:
        // TODO: Render warning
        return null;
    }
  },
};

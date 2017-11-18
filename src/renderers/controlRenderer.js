import buttonRenderer from './buttonRenderer';
import textRenderer from './textRenderer';
import validator from '../validators/basicValidator';

export default {
  render(definition, validators, createElement, context) {
    switch (definition.type) {
      case 'button':
        return buttonRenderer.render(
          definition,
          createElement,
          context,
        );
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
        return textRenderer.render(
          definition,
          createElement,
          context,
          validator,
          validators,
        );
    }
  },
};

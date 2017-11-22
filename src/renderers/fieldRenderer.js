import textRenderer from './textRenderer';
import validator from '../validators/basicValidator';

export default {
  render(definition, validators, createElement, context) {
    const options = definition;
    switch (options.type) {
      case 'text':
      case 'number':
        // Some properties do not make sense for number
        if (options.type === 'number') {
          options.multiline = false;
          options.inputType = options.step ? options.type : 'text';
        }

        return textRenderer.render(
          options,
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

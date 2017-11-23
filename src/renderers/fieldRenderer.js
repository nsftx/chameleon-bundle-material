import richTextRenderer from './richTextRenderer';
import textRenderer from './textRenderer';
import validator from '../validators/basicValidator';

const renderers = {
  number: textRenderer,
  richText: richTextRenderer,
  text: textRenderer,
};

export default {
  render(definition, validators, createElement, context) {
    const options = definition;
    switch (options.type) {
      case 'number':
        // Some properties do not make sense for number
        if (options.type === 'number') {
          options.multiline = false;
          options.inputType = options.step ? options.type : 'text';
        }

        break;
      default:
        // TODO: Render warning
        break;
    }

    return renderers[options.type].render(
      options,
      createElement,
      context,
      validator,
      validators,
    );
  },
};

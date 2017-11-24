import richTextRenderer from './richTextRenderer';
import textRenderer from './textRenderer';
import validator from '../validators/basicValidator';

const renderers = {
  money: textRenderer,
  number: textRenderer,
  richText: richTextRenderer,
  text: textRenderer,
};

export default {
  render(definition, validators, createElement, context) {
    const options = Object.assign({}, definition);

    if (options.type === 'number') {
      options.multiline = false;
      options.inputType = options.step ? options.type : 'text';
    } else if (options.type === 'money') {
      options.multiline = false;
      // Bind suffix and prefix to currency properties
      if (options.suffix) options.suffix = options.currency[options.suffix];
      if (options.prefix) options.prefix = options.currency[options.prefix];
    }

    const renderer = renderers[options.type];
    if (!renderer) {
      return null;
    }

    return renderer.render(
      options,
      createElement,
      context,
      validator,
      validators,
    );
  },
};

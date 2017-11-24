import _isArray from 'lodash/isArray';

const getToolbar = (definition) => {
  if (_isArray(definition.toolbar)) {
    return definition.toolbar;
  }

  let toolbar;
  switch (definition.toolbar) {
    case 'mini':
      toolbar = [
        ['bold', 'italic', 'underline'],
      ];
      break;
    case 'basic':
      toolbar = [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
      ];
      break;
    case 'advanced':
      toolbar = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
      ];
      break;
    case 'full':
      toolbar = [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        [{ script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block'],
        ['clean'],
      ];
      break;
    case 'default':
    default:
      // Default toolbar setup by Quill
      toolbar = true;
  }

  return toolbar;
};

const getAttrs = (context, definition) => {
  const attrs = {
    name: definition.name,
  };

  return attrs;
};

const getProps = (context, definition, validator) => {
  const props = {
    placeholder: definition.placeholder,
    rules: validator.getRules(definition, context.validators),
    content: definition.value,
    toolbar: getToolbar(definition),
  };

  return props;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      self.value = value;
    },
  };

  return listeners;
};

export default {
  render(createElement, context, definition, validator) {
    return createElement(
      'c-rich-text',
      {
        attrs: getAttrs(context, definition),
        props: getProps(context, definition, validator),
        on: getListeners(context),
      },
    );
  },
};

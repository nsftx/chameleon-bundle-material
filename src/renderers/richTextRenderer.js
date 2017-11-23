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
        ['link', 'image'],
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

const getAttrs = (definition) => {
  const attrs = {
    name: definition.name,
  };

  return attrs;
};

const getProps = (definition, context, validator, validators) => {
  const props = {
    placeholder: definition.placeholder,
    rules: validator.getRules(definition, validators),
    content: definition.value,
    toolbar: getToolbar(definition),
  };

  return props;
};

export default {
  render(definition, createElement, context, validator, validators) {
    return createElement(
      'c-rich-text',
      {
        attrs: getAttrs(definition),
        props: getProps(definition, context, validator, validators),
      },
    );
  },
};

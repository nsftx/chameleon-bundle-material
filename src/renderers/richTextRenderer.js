import _isArray from 'lodash/isArray';
import Quill from 'quill';

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

const getProps = (definition) => {
  const props = {
    value: definition.value,
  };

  return props;
};

const getListeners = () => {
  const listeners = {
  };

  return listeners;
};

export default {
  render(definition, createElement, context, validator, validators) {
    return createElement(
      'div',
      {
        class: {
          /*
            TODO: Don't like this.
            Figure out the way to separate custom controls in form (maybe on form level)
            Vuetify controls already have spacing between
          */
          'pb-3': true,
        },
      },
      [
        createElement(
          'div',
          {
            ref: 'editor',
            attrs: getAttrs(definition),
            props: getProps(definition, context, validator, validators),
            on: getListeners(context),
          },
        ),
      ],
    );
  },
  mounted(context) {
    const self = context;
    const definition = context.definition;

    self.editor = new Quill(self.$refs.editor, {
      theme: 'snow',
      placeholder: definition.placeholder,
      modules: {
        toolbar: getToolbar(definition),
      },
    });

    if (definition.value) {
      self.editor.pasteHTML(definition.value);
    }

    self.editor.on('selection-change', (range) => {
      if (range) {
        self.$emit('focus', self.editor);
      } else {
        self.$emit('blur', self.editor);
      }
    });

    self.editor.on('text-change', () => {
      let html = self.$refs.editor.children[0].innerHTML;

      // Handle empty editor
      if (html === '<p><br></p>') html = '';

      self.$emit('input', {
        html: self.html,
      });
    });
  },
  beforeDestroy(context) {
    const self = context;
    self.editor = null;
  },
};

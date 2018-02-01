import _ from 'lodash';
import namespace from '@namespace';
import { fieldable, validatable } from '@mixins';

require('../../style/components/_rich-text.styl');

const getToolbar = (definition) => {
  if (_.isArray(definition.toolbar)) {
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

export default {
  name: `${namespace}rich-text`,
  mixins: [
    fieldable,
    validatable,
  ],
  data() {
    return {
      editor: null,
    };
  },
  render(createElement) {
    return createElement(
      'div',
      {
        /*
          TODO: Change this margin.
          Figure out the way to separate custom controls in form (maybe on form level)
          Vuetify controls already have spacing between
        */
        staticClass: `${this.name} mb-3`,
        class: {
          'rich-text--error': this.hasError,
        },
      },
      [
        createElement(
          'div',
          {
            ref: 'editor',
          },
        ),
      ],
    );
  },
  mounted() {
    this.value = this.definition.value;

    this.editor = new Quill(this.$refs.editor, {
      theme: 'snow',
      placeholder: this.definition.placeholder,
      modules: {
        toolbar: getToolbar(this.definition),
      },
    });

    if (this.value) {
      this.editor.clipboard.dangerouslyPasteHTML(this.value);
    }

    this.editor.on('selection-change', (range) => {
      if (range) {
        this.$emit('focus', this.editor);
      } else {
        this.$emit('blur', this.editor);
      }
    });

    this.editor.on('text-change', () => {
      let html = this.$refs.editor.children[0].innerHTML;

      // Handle empty editor
      if (html === '<p><br></p>') {
        html = '';
      }

      this.value = html;
      this.validate();
      this.$emit('input', this.value);
    });
  },
  beforeDestroy() {
    this.editor = null;
  },
};

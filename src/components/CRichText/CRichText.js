import _ from 'lodash';
import Quill from 'quill';
import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

require('../../stylus/components/_rich-text.styl');

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
  name: 'c-rich-text',
  mixins: [
    fieldable,
  ],
  data() {
    return {
      editor: null,
      // Property names in sync with vuetify
      valid: true,
      rules: null,
      errorBucket: {
        type: Array,
        default() {
          return [];
        },
      },
    };
  },
  computed: {
    hasError() {
      return !this.valid;
    },
  },
  methods: {
    validate() {
      this.errorBucket = [];

      if (this.rules) {
        _.each(this.rules, (rule) => {
          const isValid = rule(this.value);
          if (isValid !== true) {
            this.errorBucket.push(isValid);
          }
        });
      }

      this.valid = this.errorBucket.length === 0;

      return this.valid;
    },
  },
  render(createElement) {
    return createElement(
      'div',
      {
        class: {
          /*
            TODO: Don't like this.
            Figure out the way to separate custom controls in form (maybe on form level)
            Vuetify controls already have spacing between
          */
          'mb-3': true,
          'input-richtext': true,
          'input-richtext--error': this.hasError,
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
    this.rules = validator.getRules(this.definition, this.validators);

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

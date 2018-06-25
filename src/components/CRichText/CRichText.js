import { isArray } from 'lodash';
import { fieldable, validatable } from '@mixins';
import Element from '../Element';

require('../../style/components/_rich-text.styl');

const getToolbar = (config) => {
  if (isArray(config.toolbar)) {
    return config.toolbar;
  }

  let toolbar;
  switch (config.toolbar) {
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
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    setEditor() {
      this.value = this.config.value;

      this.editor = new Quill(this.$refs.editor, {
        theme: 'snow',
        placeholder: this.config.placeholder,
        modules: {
          toolbar: getToolbar(this.config),
        },
      });

      if (this.value) {
        this.editor.clipboard.dangerouslyPasteHTML(this.value);
      }

      this.editor.on('selection-change', (range) => {
        if (range) {
          this.$emit('focus', this.editor);
          this.sendToEventBus('FocusedIn', { text: this.value });
        } else {
          this.$emit('blur', this.editor);
          this.sendToEventBus('FocusedOut', { text: this.value });
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
        this.sendToEventBus('Changed', { text: this.value });
      });
    },
  },
  render(createElement) {
    /*
      TODO: Change this margin.
      Figure out the way to separate custom controls in form (maybe on form level)
      Vuetify controls already have spacing between
    */
    const data = {
      class: {
        'rich-text--error': this.hasError,
        'mb-3': true,
      },
      props: {
        flat: true,
        dark: this.isThemeDark,
        light: this.isThemeLight,
      },
    };

    const children = createElement(
      'div',
      {
        ref: 'editor',
      },
    );

    return this.renderElement('v-card', data, children);
  },
  mounted() {
    const urls = [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.4/quill.min.js',
        type: 'script',
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.4/quill.snow.min.css',
        type: 'link',
      },
    ];
    this.loadDependencies(urls, 'Quill').then(() => {
      this.setEditor();
    });
  },
  beforeDestroy() {
    this.editor = null;
  },
};

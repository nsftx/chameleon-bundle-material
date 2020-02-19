import {
  cloneDeep, isNil,
} from 'lodash';
import {
  errorable,
  localizable,
  validatable,
} from '@/mixins';

/*
This is a base element for all components.
*/
export default {
  mixins: [
    errorable,
    localizable,
    validatable,
  ],
  props: {
    // New components prop - representing dataSource
    items: {
      type: Array,
      default: () => [],
    },
    definition: {
      type: Object,
      default: () => { },
    },
    theme: {
      type: String,
      default: 'light',
    },
  },
  data() {
    return {
      config: {},
    };
  },
  // If there is an error insde render method
  // it will render default error template with error message
  renderError() {
    return this.renderErrorTemplate();
  },
  methods: {
    dispatchEvent(name, payload) {
      this.$emit(name, cloneDeep(payload));
    },
    renderElement(tag, options, items) {
      const props = isNil(options) ? {} : cloneDeep(options);
      const staticClass = props.staticClass || '';

      props.staticClass = `${this.$options.name} ${staticClass}`;

      return this.$createElement(
        tag,
        props,
        [items],
      );
    },
    renderChildElement(tag, options) {
      const props = isNil(options) ? {} : cloneDeep(options);
      props.staticClass = `${this.$options.name}-items`;

      return this.$createElement(
        tag,
        props,
        this.renderChildren(this.$createElement),
      );
    },
  },
  computed: {
    isThemeDark() {
      return this.theme === 'dark';
    },
    isThemeLight() {
      return this.theme === 'light';
    },
  },
  created() {
    this.config = this.definition || this.$props;
  },
};

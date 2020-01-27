import {
  cloneDeep, isNil,
} from 'lodash';
import {
  errorable,
  localizable,
  validatable,
  themable,
} from '@/mixins';

/*
This is a base element for all components.
*/
export default {
  mixins: [
    errorable,
    localizable,
    validatable,
    themable,
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
      this.$emit(`${name.toLowerCase()}`, cloneDeep(payload));
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
  created() {
    this.config = this.definition || this.$props;
  },
};

import {
  cloneDeep, isNil,
} from 'lodash';
import {
  elementable,
  errorable,
  localizable,
  sourceable,
  validatable,
  themable,
} from '@/mixins';

// Use this, or rename current sendToEventBus method inside components
const reactionable = {
  methods: {
    sendToEventBus(name, payload) {
      const id = this.config && this.config.id;
      if (id) {
        this.$emit(`${id}-${name}`, cloneDeep(payload));
        return;
      }
      this.$emit(`${name}`, cloneDeep(payload));
    },
  },
};

/*
This is a base element for all components.
*/
export default {
  mixins: [
    elementable,
    errorable,
    localizable,
    sourceable, // TODO - remove
    validatable,
    themable,
    reactionable,
  ],
  data() {
    return {
      items: null,
    };
  },
  // If there is an error insde render method
  // it will render default error template with error message
  renderError() {
    return this.renderErrorTemplate();
  },
  methods: {
    loadData() {
      return this.loadConnectorData().then((result) => {
        this.items = result.items || null;
        this.sendToEventBus('DataSourceChanged', this.dataSource);

        return result;
      });
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
      props.staticClass = `${this.baseChildrenClass} ${this.$options.name}-items`;

      return this.$createElement(
        tag,
        props,
        this.renderChildren(this.$createElement),
      );
    },
  },
};

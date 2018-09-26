import {
  bindable,
  dependable,
  elementable,
  localizable,
  sourceable,
  reactionable,
  themeable,
} from '@mixins';

import { cloneDeep, merge, isNil } from 'lodash';
/*
This is a base element for all componets.
This element applies elementable mixin from sdk, and
appends baseClass, baseParentClass and baseChildrenClass
*/
export default {
  mixins: [
    bindable,
    dependable,
    elementable,
    localizable,
    sourceable,
    reactionable,
    themeable,
  ],
  methods: {
    renderElement(tag, options, items, parentable) {
      const props = isNil(options) ? {} : cloneDeep(options);
      const staticClass = props.staticClass || '';

      props.attrs = merge(options.attrs, this.getSchemaAttributes());

      props.staticClass = `${this.baseClass} ${this.$options.name} ${staticClass}`;

      if (parentable) {
        props.staticClass = `${props.staticClass} ${this.baseParentClass} ${staticClass}`;
      }

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
    /*
    This method is exposed for reactions communication on eventBus.
    Method is called when component receives reaction with component listener.
    */
    setDataSource(source) {
      this.$set(this.config, 'dataSource', source);
    },
    setInputValue(value) {
      this.value = value;
      this.$emit('input', value);
    },
    setItemDisabledValue(value) {
      this.$set(this.config, 'disabled', value);
    },
  },
};

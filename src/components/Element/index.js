import {
  bindable,
  dependable,
  elementable,
  localizable,
  sourceable,
  reactionable,
} from '@mixins';

import { cloneDeep, merge, isNil } from 'lodash';
/*
This is a base element for all componets.
This element applies elementable mixin from sdk, and
appends baseClass and baseChildrenClass
*/
export default {
  mixins: [
    bindable,
    dependable,
    elementable,
    localizable,
    sourceable,
    reactionable,
  ],
  methods: {
    renderElement(tag, properties, items, parentable) {
      const props = isNil(properties) ? {} : cloneDeep(properties);

      props.attrs = merge(properties.attrs, this.getSchemaAttributes());
      props.staticClass = `${this.baseClass} ${this.$options.name}`;

      if (parentable) {
        props.staticClass += ` ${this.baseParentClass}`;
      }

      return this.$createElement(tag,
        props, [items]);
    },
    renderChildElement(tag, properties) {
      const props = isNil(properties) ? {} : cloneDeep(properties);
      props.staticClass = `${this.baseChildrenClass} ${this.$options.name}-items`;

      return this.$createElement(tag,
        props, this.renderChildren(this.$createElement));
    },
  },
};

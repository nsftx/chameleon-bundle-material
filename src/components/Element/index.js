import {
  bindable,
  dependable,
  elementable,
  localizable,
  sourceable,
  reactionable,
} from '@mixins';

import { cloneDeep, merge } from 'lodash';
/*
This is a base element for all componets.
This element applies elementable mixin from sdk.
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
    renderElement(tag, properties, items) {
      const props = cloneDeep(properties);

      props.attrs = merge(properties.attrs, this.getSchemaAttributes());
      props.staticClass = `${this.baseClass} ${this.$options.name}`;

      return this.$createElement(tag,
        props, [items]);
    },
  },
};

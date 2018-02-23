import uuid from 'uuid/v4';
import { assign, kebabCase, map } from 'lodash';
import namespace from '@namespace';

/*
This mixin is shared by all components.
Do not place any component specific logic here!
*/
export default {
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  computed: {
    schema() {
      return assign({
        uid: uuid(),
        parentUid: null,
      }, this.definition._schema);
    },
  },
  data() {
    return {
      baseClass: `${namespace}element`,
      baseChildrenClass: `${namespace}element-children`,
    };
  },
  methods: {
    /*
    Generates data attributes needed
    for chameleon builder.
    */
    getSchemaAttributes() {
      return {
        'data-type': this.schema.type,
        'data-uid': this.schema.uid,
        'data-parent': this.schema.parentUid,
      };
    },
    /*
    Renders child components of container that
    has no specific children like panel, hlist, vlist.
    */
    renderChildren(createElement) {
      const children = this.definition.elements;
      return map(children, (child) => {
        const el = createElement(
          `${namespace}${kebabCase(child.type)}`,
          {
            staticClass: `${this.$options.name}-item`,
            props: {
              definition: child,
            },
          },
        );

        return el;
      });
    },
  },
};

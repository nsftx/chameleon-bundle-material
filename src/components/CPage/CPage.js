import { each, kebabCase } from 'lodash';
import { elementable, reactionable } from '@mixins';

export default {
  mixins: [
    elementable,
    reactionable,
  ],
  computed: {
    elements() {
      return this.config.elements;
    },
    name() {
      return this.config.name;
    },
  },
  methods: {
    navigateToPage(payload, data) {
      if (payload && payload.page) {
        this.$router.push({
          path: payload.page,
          params: data,
        });
      }
    },
  },
  mounted() {
    this.sendToEventBus('Loading');
  },
  render(createElement) {
    const baseName = this.$options.name;
    const uniqueName = kebabCase(this.name);
    const baseClass = `${baseName} ${baseName}-${uniqueName}`;
    const children = [];

    if (this.elements) {
      each(this.elements, (n) => {
        children.push(createElement(
          this.getElementTag(n.type),
          {
            props: {
              definition: n,
            },
          },
          children,
        ));
      });
    }

    return createElement(
      'div',
      {
        staticClass: baseClass,
      },
      children,
    );
  },
};

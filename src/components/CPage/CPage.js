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
      const route = {
        path: payload.page,
        params: data,
      };

      if (!this.registry.isPreviewMode && payload && payload.page) {
        this.$router.push(route);
      } else {
        // eslint-disable-next-line
        console.info('[CMB] Navigation disabled in preview mode =>', JSON.stringify(route));
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

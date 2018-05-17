import { each, kebabCase, isNil } from 'lodash';
import { elementable, reactionable } from '@mixins';

const renderPreviewStyle = (context) => {
  if (context.registry.isPreviewMode) {
    return {
      width: context.config.width,
      height: context.config.height,
      overflow: context.config.overflow,
    };
  }
  return {};
};

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
      if (isNil(data)) {
        // eslint-disable-next-line
        console.info('[CMB] Data is required for navigation');
        return;
      }

      const route = {
        path: data.page,
        params: payload,
      };

      if (!this.registry.isPreviewMode && route.path) {
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
        style: renderPreviewStyle(this),
      },
      children,
    );
  },
};

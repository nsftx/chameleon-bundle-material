import { each, kebabCase, isNil } from 'lodash';
import { elementable, reactionable, themeable } from '@mixins';
import { logger, loggerNamespace } from '@utility';

const getPreviewStyle = (context) => {
  const layout = context.config.layout;

  if (context.registry.isPreviewMode && layout) {
    return {
      width: layout.previewWidth,
      height: layout.previewHeight,
      overflow: layout.overflow,
    };
  }

  return {};
};

export default {
  mixins: [
    elementable,
    reactionable,
    themeable,
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
        logger.info(
          'Data is required for navigation',
          JSON.stringify(payload),
          loggerNamespace,
        );

        return;
      }

      const route = {
        path: data.page,
        params: payload,
      };

      if (!this.registry.isPreviewMode && route.path) {
        this.$router.push(route);
      } else {
        logger.info(
          'Navigation disabled in preview mode =>',
          JSON.stringify(route),
          loggerNamespace,
        );
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
      each(this.elements, (element) => {
        children.push(createElement(
          this.getElementTag(element.type),
          {
            props: {
              definition: element,
            },
          },
          children,
        ));
      });
    }

    return createElement(
      'v-card',
      {
        props: {
          dark: this.isThemeDark,
          light: this.isThemeLight,
          flat: true,
        },
        staticClass: baseClass,
        style: getPreviewStyle(this),
      },
      children,
    );
  },
};

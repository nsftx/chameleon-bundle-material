import { each, kebabCase, isNil } from 'lodash';
import { elementable, reactionable, themable } from '@mixins';
import { logger, loggerNamespace } from '@utility';

const getPreviewStyle = (context) => {
  const layout = context.config.layout;
  if (layout && context.registry.isPreviewMode) {
    return {
      height: '100%',
      width: layout.previewWidth,
    };
  }
  return {
    height: '100%',
    width: '100%',
  };
};

export default {
  mixins: [
    elementable,
    reactionable,
    themable,
  ],
  computed: {
    elements() {
      return this.config.elements;
    },
    name() {
      return this.config.name;
    },
    appTheme() {
      if (isNil(this.config.theme) && this.registry) {
        const app = this.registry.app;
        if (app && app.theme) {
          return this.registry.app.theme;
        }
      }

      return null;
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
          dark: this.appTheme ? this.appTheme === 'dark' : this.isThemeDark,
          light: this.appTheme ? this.appTheme === 'light' : this.isThemeLight,
          color: this.config.color,
          flat: true,
        },
        staticClass: baseClass,
        style: getPreviewStyle(this),
      },
      children,
    );
  },
};

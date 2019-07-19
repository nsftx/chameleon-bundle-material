import {
  each, kebabCase, isNil,
} from 'lodash';
import {
  bindable, elementable, reactionable, themable,
} from '@/mixins';
import { logger, loggerNamespace } from '@/utility';
import Element from '../Element';

export default {
  extends: Element,
  mixins: [
    bindable,
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
    theme() {
      if (isNil(this.config.theme) && this.registry) {
        const { app } = this.registry;
        if (app) {
          return this.registry.app.theme;
        }
      }

      return this.config.theme;
    },
  },
  methods: {
    renderPage(children, component) {
      const baseName = this.$options.name;
      const uniqueName = kebabCase(this.name);
      const baseClass = `${baseName} ${baseName}-${uniqueName}`;
      return this.renderElement(
        component,
        {
          props: {
            dark: this.isThemeDark,
            light: this.isThemeLight,
            color: this.config.color,
            flat: true,
          },
          staticClass: baseClass,
          style: {
            height: '100%',
            width: '100%',
          },
        },
        children,
      );
    },
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
        name: data.page,
        params: payload,
      };

      if (!this.registry.isPreviewMode && route.name) {
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

    return this.renderPage(children, 'v-card');
  },
};

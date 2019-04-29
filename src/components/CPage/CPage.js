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
    renderPage(children) {
      const baseName = this.$options.name;
      const uniqueName = kebabCase(this.name);
      const baseClass = `${baseName} ${baseName}-${uniqueName}`;
      return this.renderElement(
        'v-card',
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
    const activePageLayout = this.getBindingValue('=$activePageLayout');
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

    // If page has an layout render it first, and set Page as an layout slot
    if (activePageLayout) {
      return createElement('c-layout', {
        props: {
          definition: activePageLayout,
        },
        scopedSlots: {
          default: () => this.renderPage(children),
        },
      });
    }

    return this.renderPage(children);
  },
};

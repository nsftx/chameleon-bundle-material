import {
  each, find, kebabCase, isNil,
} from 'lodash';
import {
  bindable, elementable, reactionable, themable,
} from '@/mixins';
import { logger, loggerNamespace } from '@/utility';
import Element from '../Element';

const getPreviewStyle = (context) => {
  const { layout } = context.config;
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
          style: getPreviewStyle(this),
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
    const layout = this.config.layout ? this.config.layout.layoutId : null;
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
    if (layout) {
      const activeLayouts = this.getBindingValue('=$appLayouts');
      const layoutDefinition = find(activeLayouts, {
        id: layout,
      });
      return createElement('c-layout', {
        props: {
          definition: layoutDefinition,
        },
        scopedSlots: {
          default: () => this.renderPage(children),
        },
      });
    }

    return this.renderPage(children);
  },
};

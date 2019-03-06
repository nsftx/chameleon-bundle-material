import { cloneDeep, each, isNil, map } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
    },
  },
  methods: {
    getElementChildren(element, item) {
      if (element) {
        return map(element, (el) => {
          const elDefinition = el;
          if (!isNil(elDefinition.dataSource)) {
            elDefinition.dataSource.items = [item];
            elDefinition.dataSource.local = true;
          }
          return this.$createElement(this.getElementTag(el.type), {
            props: {
              definition: elDefinition,
            },
          },
            [
              this.getElementChildren(elDefinition.elements, item),
            ]);
        });
      }
      return null;
    },
    getRepeaterChildren(element, style) {
      if (isNil(this.config.dataSource) && isNil(this.items)) {
        return this.$createElement(this.getElementTag(element.type), {
          props: {
            definition: element,
          },
        });
      }
      return map(this.items, (item, index) => {
        const elementDefinition = cloneDeep(element);
        if (!isNil(elementDefinition.dataSource)) {
          elementDefinition.dataSource.items = [item];
          elementDefinition.dataSource.local = true;
        }
        return this.$createElement(this.getElementTag(elementDefinition.type), {
          props: {
            definition: elementDefinition,
          },
          // Add parent static class so that it can inherit parent (container) style
          staticClass: `${this.$options.namespace}${this.$parent.$attrs['data-type']}-item`,
          style: this.registry.isPreviewMode && index >= 1 ? style : null,
        },
          [
            this.getElementChildren(elementDefinition.elements, item),
          ],
        );
      });
    },
  },
  render() {
    const config = this.config;
    let children = [];
    const data = {
      props: {
        flat: config.flat,
      },
      staticClass: `${this.baseChildrenClass}`,
    };

    // Style for all render items, except the first one
    const style = {
      opacity: '0.3',
      pointerEvents: 'none',
      userSelect: 'none',
    };

    if (this.config.elements && this.config.elements.length) {
      each(this.config.elements, (el) => {
        children.push(this.getRepeaterChildren(el, style));
      });
    } else {
      // Render placeholder
      children = this.$createElement(
        'v-icon',
        {
          props: { xLarge: true },
        },
        'repeat',
      );
    }

    return this.renderElement('v-card', data, children, true);
  },
};

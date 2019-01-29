import { cloneDeep, isNil, map } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  computed: {
    element() {
      return this.config.elements[0];
    },
  },
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
    },
  },
  render(createElement) {
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

    if (this.element && (isNil(this.element.dataSource) || isNil(this.items))) {
      children = createElement(this.getElementTag(this.element.type), {
        props: {
          definition: this.element,
        },
      });
    } else {
      children = map(this.items, (item, index) => {
        const elementDefinition = cloneDeep(this.element);
        elementDefinition.dataSource.items = [item];
        elementDefinition.dataSource.local = true;

        return createElement(this.getElementTag(this.element.type), {
          props: {
            definition: elementDefinition,
          },
          // Add parent static class so that it can inherit parent (container) style
          staticClass: `${this.$options.namespace}${this.$parent.$attrs['data-type']}-item`,
          style: this.registry.isPreviewMode && index >= 1 ? style : null,
        });
      });
    }

    return this.renderElement('v-card', data, children, true);
  },
};

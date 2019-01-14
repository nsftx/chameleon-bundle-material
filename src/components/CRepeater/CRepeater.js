import { isNil, map, cloneDeep } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  data() {
    return {
      items: [],
    };
  },
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
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
      });
    },
  },
  render(createElement) {
    const config = this.config;
    let children = [];
    const data = {
      key: this.schema.uid,
      props: {
        flat: config.flat,
      },
      staticClass: `${this.baseChildrenClass}`,
      style: {
        width: '100%',
        height: '100%',
      },
    };

    if (this.items.length && this.element && !isNil(this.element.dataSource)) {
      children = map(this.items, (item) => {
        const elementDefinition = this.element;
        elementDefinition.dataSource.items = [cloneDeep(item)];
        elementDefinition.dataSource.local = true;
        return createElement(this.getElementTag(this.element.type), {
          props: {
            definition: elementDefinition,
          },
        });
      });
    } else if (this.element && isNil(this.element.dataSource)) {
      children = createElement(this.getElementTag(this.element.type), {
        props: {
          definition: config.elements[0],
        },
      });
    }

    return this.renderElement('v-card', data, children, true);
  },
};

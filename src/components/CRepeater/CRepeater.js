import { map } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  data() {
    return {
      items: [],
      children: [],
    };
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
    const data = {
      key: this.schema.uid,
      props: {
        flat: config.flat,
      },
      staticClass: `${this.$options.name} ${this.baseChildrenClass}`,
      style: {
        width: '100%',
        height: '100%',
      },
    };

    if (this.items.length) {
      this.children = map(this.items, () =>
        createElement(this.getElementTag(config.elements[0].type), {
          props: {
            definition: config.elements[0],
          },
        }));
    }

    return this.renderElement('v-card', data, this.children, true);
  },
};

import { isObject } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  watch: {
    dataSource: {
      handler() {
        this.loadData().then(() => {
          this.value = this.textValue;
        });
      },
      deep: true,
    },
  },
  computed: {
    textValue() {
      if (this.items && this.items.length) {
        return isObject(this.items[0]) ? this.items[0].text : this.items[0];
      }
      return this.config.value;
    },
    textType() {
      return this.config.textStyle || 'p';
    },
  },
  render() {
    const self = this;
    const data = {};

    return self.renderElement(this.textType, data);
  },
};

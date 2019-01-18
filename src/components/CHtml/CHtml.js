import { isNil, isObject } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  data() {
    return {
      items: null,
    };
  },
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
      deep: true,
    },
  },
  computed: {
    htmlValue() {
      if (this.items && this.items.length) {
        return isObject(this.items[0]) ? this.items[0].html : this.items[0];
      }
      return this.config.value;
    },
  },
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
  },
  render(createElement) {
    let icon = null;
    const data = {
      props: {
        color: this.config.color,
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: true,
      },
      domProps: {},
    };

    if (isNil(this.htmlValue) || !this.htmlValue.length) {
      icon = createElement('v-icon', {
        props: { xLarge: true },
      }, 'code');
    } else {
      data.domProps.innerHTML = this.htmlValue;
    }

    return this.renderElement('v-card', data, icon);
  },
};

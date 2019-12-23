import {
  each,
  isObject,
  template,
} from 'lodash';
import isURL from 'validator/lib/isURL';
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
    },
  },
  computed: {
    backgroundImageSrc() {
      return this.getOptionDataSource('backgroundImage');
    },
    backgroundImg() {
      if (!this.backgroundImageSrc) return null;
      return isURL(this.backgroundImageSrc, { protocols: ['http', 'https'], require_protocol: true })
        ? this.backgroundImageSrc : this.parseImageSrc(this.backgroundImageSrc);
    },
  },
  methods: {
    getOptionDataSource(type) {
      if (!this.items || !this.items.length) return this.config[type];
      return isObject(this.items[0]) && this.items[0][type]
        ? this.items[0][type] : this.config[type];
    },
    getCardDefinition(self) {
      return {
        props: {
          dark: this.isThemeDark,
          light: this.isThemeLight,
          color: this.config.color,
          flat: this.config.flat,
          // I'm setting bg image inside base card because v-card
          // (base card only element) has img prop
          img: this.backgroundImg,
        },
        on: {
          click() {
            self.sendToEventBus('Selected', self.$el);
          },
        },
      };
    },
    createCard(components) {
      return this.renderElement('v-card', this.getCardDefinition(this), components, true);
    },
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    parseImageSrc(image) {
      const srcConfig = this.registry.staticAppAssets;
      const srcParams = srcConfig.urlParams;
      let src = `${srcConfig.baseUrl}${srcConfig.appUrl}`;

      each(srcParams, (param, key) => {
        const paramValue = this.getBindingValue(param);
        src = template(src)({ [key]: paramValue });
      });

      return `${src}/${image}`;
    },
  },
  render() {
    return this.createCard([]);
  },
};

import { isNil, isObject } from 'lodash';
import Element from '../Element';

const getStreamType = (config) => {
  const type = isNil(config.streamType) ? 'img' : config.streamType;
  return type;
};

const getStaticStyle = (config) => {
  let height = 'auto';
  let paddingTop = 0;

  if (config.aspectRatio !== 'auto' && !isNil(config.aspectRatio)) {
    height = 0;
    const ratioValue = config.aspectRatio.split(':');
    paddingTop = `${(ratioValue[1] / ratioValue[0]) * 100}%`;
  }

  const style = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height,
    paddingTop,
  };

  return style;
};

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
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
  },
  render(createElement) {
    const data = {
      staticStyle: getStaticStyle(this.config),
    };
    const source = this.items || this.config.value;
    const sourceValue = isObject(source) ? source.url : source;

    const children = createElement(
      getStreamType(this.config),
      {
        attrs: {
          src: sourceValue || null,
          width: '100%',
          height: '100%',
        },
        staticStyle: {
          position: this.config.aspectRatio !== 'auto' ? 'absolute' : 'relative',
          top: 0,
          left: 0,
        },
      },
    );

    return this.renderElement('div', data, children);
  },
};

import Element from '../Element';

export default {
  extends: Element,
  render() {
    const config = this.config;

    const data = {
      key: this.schema.uid,
      props: {
        color: this.getBindingValue(config.color),
        flat: config.flat,
      },
      style: {
        width: config.width,
      },
    };

    const children = this.renderChildElement('div');

    return this.renderElement('v-card', data, children);
  },
};

import Element from '../Element';

export default {
  extends: Element,
  render() {
    const data = {
      attrs: {
        [`xs${this.config.width}`]: true,
      },
    };

    const children = this.renderChildElement('div');

    return this.renderElement('v-flex', data, children);
  },
};

import Element from '../Element';

export default {
  extends: Element,
  render() {
    const data = {
      attrs: {
        [`xs${this.definition.width}`]: true,
      },
    };

    const children = this.renderChildElement('div');

    return this.renderElement('v-flex', data, children);
  },
};

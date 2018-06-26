import Element from '../Element';

export default {
  extends: Element,
  render() {
    const data = {
      class: {
        [`xs${this.config.width}`]: true,
        [this.config.color]: true,
        flex: true,
      },
    };

    const children = this.renderChildElement('div');

    return this.renderElement('div', data, children, true);
  },
};

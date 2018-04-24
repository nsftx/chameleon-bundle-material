import Element from '../Element';

export default {
  extends: Element,
  render() {
    const data = {
      attrs: {
        class: this.config.name,
      },
      domProps: {
        innerHTML: this.config.value,
      },
    };

    return this.renderElement('div', data);
  },
};

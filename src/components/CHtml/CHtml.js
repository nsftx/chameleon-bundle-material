import Element from '../Element';

export default {
  extends: Element,
  render() {
    const data = {
      attrs: {
        class: this.definition.name,
      },
      domProps: {
        innerHTML: this.definition.value,
      },
    };

    this.renderElement('div', data);
  },
};

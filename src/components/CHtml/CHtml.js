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

    if (!this.config.value) {
      data.staticStyle = {
        height: '50px',
      };
    }

    return this.renderElement('div', data);
  },
};

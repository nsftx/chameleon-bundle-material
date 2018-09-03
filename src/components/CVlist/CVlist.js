import Element from '../Element';

require('../../style/components/_vlist.styl');

export default {
  extends: Element,
  render() {
    const data = {
      key: this.schema.uid,
      class: {
        [`${this.$options.name}--spaced`]: this.config.gutter,
      },
      props: {
        color: this.config.color,
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: this.config.flat,
      },
      style: {
        backgroundColor: this.config.color,
      },
    };

    const children = this.renderChildElement('div');

    return this.renderElement('v-card', data, children, true);
  },
};

import Element from '../Element';

require('../../style/components/_hlist.scss');

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
        height: this.config.height,
      },
    };
    const style = {
      height: '100%',
    };

    const children = this.renderChildElement('div', { style });

    return this.renderElement('v-card', data, children, true);
  },
};

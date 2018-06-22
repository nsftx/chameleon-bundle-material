import Element from '../Element';

require('../../style/components/_hlist.styl');

export default {
  extends: Element,
  render() {
    const self = this;

    const data = {
      key: self.schema.uid,
      class: {
        [`${self.$options.name}--spaced`]: self.config.gutter,
      },
      props: {
        color: self.config.color,
        dark: self.isThemeDark,
        light: self.isThemeLight,
        flat: self.config.flat,
      },
    };

    const children = this.renderChildElement('div');

    return this.renderElement('v-card', data, children, true);
  },
};

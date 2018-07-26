import Element from '../Element';

export default {
  extends: Element,
  render() {
    const config = this.config;

    const style = {
      width: config.width,
      height: config.height,
    };

    const data = {
      key: this.schema.uid,
      props: {
        color: config.color,
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: config.flat,
      },
      style,
    };

    const children = this.renderChildElement('div', { style });

    return this.renderElement('v-card', data, children, true);
  },
};

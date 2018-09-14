import { isNil } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  render(createElement) {
    let icon = null;
    const data = {
      props: {
        color: this.config.color,
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: true,
      },
      domProps: {},
    };

    if (isNil(this.config.value) || !this.config.value.length) {
      icon = createElement('v-icon', {
        props: { xLarge: true },
      }, 'code');
    } else {
      data.domProps.innerHTML = this.config.value;
    }

    return this.renderElement('v-card', data, icon);
  },
};

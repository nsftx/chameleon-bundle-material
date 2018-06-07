import Element from '../Element';

export default {
  extends: Element,
  data() {
    return {
      isVisible: true,
    };
  },
  computed: {
    isAbsolute() {
      return !this.isFixed;
    },
    isFixed() {
      return this.config.main;
    },
    isMini() {
      return this.config.layout === 'mini';
    },
    isLeft() {
      return !this.isRight;
    },
    isRight() {
      return this.config.position === 'right';
    },
    positionType() {
      return this.config.positionType;
    },
  },
  render() {
    return this.renderElement('v-navigation-drawer', {
      key: this.schema.uid,
      class: this.getBindingValue(this.config.color),
      props: {
        absolute: this.isAbsolute,
        app: this.config.main,
        dark: this.isThemeDark,
        disableRouteWatcher: true,
        fixed: this.isFixed,
        height: this.config.height,
        left: this.isLeft,
        light: this.isThemeLight,
        miniVariant: this.isMini,
        miniVariantWidth: this.config.width,
        right: this.isRight,
        value: this.isVisible,
        width: this.config.width,
      },
    });
  },
};

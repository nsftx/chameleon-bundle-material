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
      return this.positionType === 'fixed';
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
    /*
    App property of navigation drawer defines also other
    elements like content. We need to disable this in
    preview mode currently so it will not position on our
    main app in playground (same goes for current render
    view in Builder).
    */
    const isInApp = !this.registry.isPreviewMode;

    return this.renderElement('v-navigation-drawer', {
      key: this.schema.uid,
      class: this.getBindingValue(this.config.color),
      props: {
        app: isInApp,
        disableRouteWatcher: true,
        absolute: this.isAbsolute,
        fixed: this.isFixed,
        left: this.isLeft,
        right: this.isRight,
        dark: this.isThemeDark,
        light: this.isThemeLight,
        value: this.isVisible,
        miniVariant: this.isMini,
      },
    });
  },
};

import { isUndefined } from 'lodash';
import Element from '../Element';

const getAttrs = (context) => {
  const attrs = {
    name: context.config.name,
    title: context.config.tooltip,
  };

  return attrs;
};

const getProps = (context) => {
  const { config } = context;

  const props = {
    color: config.color,
    dark: context.isThemeDark,
    light: context.isThemeLight,
    disabled: config.disabled,
    fab: isUndefined(config.displayAsIcon) ? false : config.displayAsIcon,
    round: isUndefined(config.round) ? false : config.round,
    flat: isUndefined(config.flat) ? false : config.flat,
    block: isUndefined(config.block) ? false : config.block,
    depressed: isUndefined(config.depressed) ? false : config.depressed,
    loading: false,
  };

  return props;
};

const getListeners = (context) => {
  const listeners = {
    click(value) {
      const label = value.target.innerHTML;
      context.$emit('click', label);
      context.sendToEventBus('Clicked', {
        label,
      });
    },
  };

  return listeners;
};

export default {
  extends: Element,
  render(createElement) {
    const data = {
      attrs: getAttrs(this),
      props: getProps(this),
      on: getListeners(this),
    };

    const children = () => {
      if (this.config.displayAsIcon) {
        return createElement('v-icon', this.config.icon);
      }

      const position = this.config.iconPosition === 'right';
      const icon = this.config.icon ? createElement('v-icon', {
        class: position ? 'pl-2' : 'pr-2',
      }, this.config.icon) : null;

      if (position) {
        return [
          this.config.label,
          icon,
        ];
      }
      return [
        icon,
        this.config.label,
      ];
    };

    if (this.unselectable) {
      return createElement('v-btn', data, [children()]);
    }

    return this.renderElement('v-btn', data, children());
  },
};

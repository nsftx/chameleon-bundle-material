import { each, isUndefined } from 'lodash';
import Element from '../Element';

const getAttrs = (context) => {
  const attrs = {
    name: context.config.name,
    title: context.config.tooltip,
  };

  return attrs;
};

const getProps = (context) => {
  const config = context.config;
  const defaultColor = 'primary';

  const props = {
    color: config.color || defaultColor,
    dark: true,
    icon: isUndefined(config.icon) ? false : config.icon,
    round: isUndefined(config.round) ? false : config.round,
    flat: isUndefined(config.flat) ? false : config.flat,
    block: isUndefined(config.block) ? false : config.block,
    depressed: isUndefined(config.depressed) ? false : config.depressed,
    loading: false,
  };

  return props;
};

const getListeners = (context) => {
  const listeners = {};

  if (context.config.actions) {
    each(context.config.actions, (action, actionKey) => {
      listeners[actionKey] = () => {
        context.$emit(action);
      };
    });
  }

  return listeners;
};

export default {
  extends: Element,
  render() {
    const data = {
      attrs: getAttrs(this),
      props: getProps(this),
      on: getListeners(this),
    };

    return this.renderElement('v-btn', data, this.config.label);
  },
};

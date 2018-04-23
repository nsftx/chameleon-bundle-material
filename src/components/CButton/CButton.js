import { each, isUndefined } from 'lodash';
import Element from '../Element';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    title: context.definition.tooltip,
  };

  return attrs;
};

const getProps = (context) => {
  const definition = context.definition;
  const defaultColor = 'primary';

  const props = {
    color: definition.color || defaultColor,
    dark: true,
    icon: isUndefined(definition.icon) ? false : definition.icon,
    round: isUndefined(definition.round) ? false : definition.round,
    flat: isUndefined(definition.flat) ? false : definition.flat,
    block: isUndefined(definition.block) ? false : definition.block,
    depressed: isUndefined(definition.depressed) ? false : definition.depressed,
    loading: false,
  };

  return props;
};

const getListeners = (context) => {
  const listeners = {};

  if (context.definition.actions) {
    each(context.definition.actions, (action, actionKey) => {
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

    return this.renderElement('v-btn', data, this.definition.label);
  },
};

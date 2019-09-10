import Accordion from './CAccordion';

export default {
  install(Vue, options) {
    const name = `${options.namespace}accordion`;

    Vue.component(name, {
      name,
      extends: Accordion,
      namespace: options.namespace,
    });
  },
};

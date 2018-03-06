import AccordionItem from './CAccordionItem';

export default {
  install(Vue, options) {
    const name = `${options.namespace}accordion-item`;
    Vue.component(name, {
      extends: AccordionItem,
      namespace: options.namespace,
      name,
    });
  },
};

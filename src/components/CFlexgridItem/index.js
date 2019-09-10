import FlexgridItem from './CFlexgridItem';

export default {
  install(Vue, options) {
    const name = `${options.namespace}flexgrid-item`;

    Vue.component(name, {
      name,
      extends: FlexgridItem,
      namespace: options.namespace,
    });
  },
};

import TextArea from './CTextArea';

export default {
  install(Vue, options) {
    const name = `${options.namespace}text-area`;

    Vue.component(name, {
      extends: TextArea,
      namespace: options.namespace,
      name,
    });
  },
};

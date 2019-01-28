import TextInput from './CTextInput';

export default {
  install(Vue, options) {
    const name = `${options.namespace}text-input`;

    Vue.component(name, {
      extends: TextInput,
      namespace: options.namespace,
      name,
    });
  },
};

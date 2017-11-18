export default {
  install(Vue, options = {}) {
    if (this.installed) return;
    this.installed = true;

    if (options.components) {
      Object.keys(options.components).forEach((key) => {
        const component = options.components[key];
        Vue.use(component);
      });
    }
  },
};

import NavigationDrawer from './CNavigationDrawer';

export default {
  install(Vue, options) {
    const name = `${options.namespace}navigation-drawer`;

    Vue.component(name, {
      extends: NavigationDrawer,
      namespace: options.namespace,
      name,
    });
  },
};

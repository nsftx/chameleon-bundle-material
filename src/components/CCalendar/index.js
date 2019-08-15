import Calendar from './CCalendar';

export default {
  install(Vue, options) {
    const name = `${options.namespace}calendar`;
    Vue.component(name, {
      name,
      extends: Calendar,
      namespace: options.namespace,
    });
  },
};

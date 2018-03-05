import CheckList from './CCheckList';

export default {
  install(Vue, options) {
    Vue.component(`${options.namespace}${CheckList.name}`, CheckList);
  },
};

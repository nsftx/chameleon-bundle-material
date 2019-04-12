export default {
  type: 'layout',
  name: 'Layout',
  icon: 'web',
  hidden: true,
  options: {
    color: true,
    name: {
      type: 'input',
      name: 'Custom Layout Name',
      value: null,
      priority: 1,
    },
    layoutType: {
      type: 'input',
      name: 'Type',
      value: null,
      disabled: true,
      priority: 1,
    },
  },
};

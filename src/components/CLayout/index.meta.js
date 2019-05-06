export default {
  type: 'layout',
  name: 'Layout',
  icon: 'web',
  hidden: true,
  options: {
    theme: true,
    name: {
      type: 'input',
      name: 'Custom Layout Name',
      value: '=$activePageLayout.name',
      priority: 1,
    },
    layoutType: {
      type: 'input',
      name: 'Type',
      value: '=$activePageLayout.layoutType',
      disabled: true,
      priority: 1,
    },
  },
};

export default {
  group: 'widgets',
  type: 'html',
  name: 'Html Markup',
  icon: 'html',
  options: {
    value: {
      type: 'input',
      name: 'Html Markup',
      value: null,
      multiLine: true,
      priority: 1,
    },
    allowUnsafe: {
      type: 'check',
      name: 'Allow Unsafe',
      value: false,
      priority: 2,
    },
  },
};

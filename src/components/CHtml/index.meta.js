export default {
  group: 'widgets',
  type: 'html',
  name: 'Html',
  icon: 'code',
  options: {
    value: {
      type: 'input',
      name: 'Html Code',
      value: null,
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

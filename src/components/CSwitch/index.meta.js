export default {
  group: 'inputs',
  type: 'switch',
  name: 'Switch',
  icon: 'sync',
  options: {
    label: {
      type: 'input',
      name: 'Label text',
      value: '',
      priority: 1,
    },
    color: {
      type: 'input',
      name: 'Color',
      value: 'primary',
      priority: 2,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: '',
      priority: 3,
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
      priority: 4,
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
      priority: 5,
    },
    disabled: {
      type: 'check',
      name: 'Disable switch',
      value: false,
      priority: 6,
    },
  },
};
export default {
  group: 'inputs',
  type: 'switch',
  name: 'Switch',
  icon: 'sync',
  options: {
    label: {
      type: 'input',
      name: 'Label text',
      value: 'Switch',
    },
    color: {
      type: 'input',
      name: 'Color',
      value: 'primary',
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: '',
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
    },
    disabled: {
      type: 'check',
      name: 'Disable switch',
      value: false,
    },
  },
};

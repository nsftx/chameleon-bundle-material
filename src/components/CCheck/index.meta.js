export default {
  group: 'inputs',
  type: 'check',
  name: 'Checkbox',
  icon: 'check',
  options: {
    label: {
      type: 'input',
      name: 'Label text',
      value: 'Remember me',
    },
    color: {
      type: 'input',
      name: 'Color',
      value: '',
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: 'person',
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
      name: 'Disabled',
      value: false,
    },
  },
};

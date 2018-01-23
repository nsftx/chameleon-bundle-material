export default {
  group: 'inputs',
  type: 'radio-list',
  name: 'Radio List',
  icon: 'radio_button_checked',
  options: {
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: '',
      priority: 1,
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
      priority: 2,
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
      priority: 3,
    },
  },
};

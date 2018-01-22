export default {
  group: 'inputs',
  type: 'radio-list',
  name: 'Radio List',
  icon: 'radio_button_checked',
  options: {
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
  },
};

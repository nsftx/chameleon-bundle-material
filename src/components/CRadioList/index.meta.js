export default {
  group: 'inputs',
  type: 'radio-list',
  name: 'Radio List',
  icon: 'radio_button_checked',
  options: {
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: '',
      priority: 1,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: '',
      priority: 2,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: '',
      priority: 3,
    },
  },
};

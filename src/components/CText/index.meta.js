export default {
  group: 'inputs',
  type: 'text',
  name: 'Text Box',
  icon: 'title',
  options: {
    label: {
      type: 'input',
      name: 'TextBox Label',
      value: '',
      priority: 1,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: '',
      priority: 2,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: '',
      priority: 3,
    },
    prefix: {
      type: 'input',
      name: 'Prefix',
      value: '',
      priority: 4,
    },
    suffix: {
      type: 'input',
      name: 'Suffix',
      value: '',
      priority: 5,
    },
    placeholder: {
      type: 'input',
      name: 'Placeholder Text',
      value: '',
      priority: 6,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: '',
      priority: 7,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: '',
      priority: 8,
    },
    multiLine: {
      type: 'check',
      name: 'Enable Multiline',
      value: false,
      priority: 9,
    },
  },
};

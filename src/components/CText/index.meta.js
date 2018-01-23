export default {
  group: 'inputs',
  type: 'text',
  name: 'Text Box',
  icon: 'title',
  options: {
    label: {
      type: 'input',
      name: 'Label text',
      value: '',
      priority: 1,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: '',
      priority: 2,
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
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
      name: 'Placeholder text',
      value: '',
      priority: 6,
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
      priority: 7,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip text',
      value: '',
      priority: 8,
    },
    multiLine: {
      type: 'check',
      name: 'Enable multipline',
      value: false,
      priority: 9,
    },
  },
};

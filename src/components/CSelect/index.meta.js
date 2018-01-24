export default {
  group: 'inputs',
  type: 'select',
  name: 'Select',
  icon: 'list',
  options: {
    label: {
      type: 'input',
      name: 'Select Label',
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
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: '',
      priority: 4,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: '',
      priority: 5,
    },
    readonly: {
      type: 'check',
      name: 'Enable Readonly',
      value: false,
      priority: 6,
    },
  },
};

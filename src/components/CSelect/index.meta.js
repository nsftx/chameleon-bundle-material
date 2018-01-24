export default {
  group: 'inputs',
  type: 'select',
  name: 'Select',
  icon: 'list',
  options: {
    label: {
      type: 'input',
      name: 'Select Label',
      value: null,
      priority: 1,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: null,
      priority: 2,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 3,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 4,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: null,
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

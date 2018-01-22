export default {
  group: 'inputs',
  type: 'selectList',
  name: 'selectList',
  icon: 'featured play list',
  options: {
    label: {
      type: 'input',
      name: 'Label text',
      value: '',
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
    tooltip: {
      type: 'input',
      name: 'Tooltip text',
      value: '',
    },
    readonly: {
      type: 'check',
      name: 'Enable readonly',
      value: false,
    },
    multiple: {
      type: 'check',
      name: 'Multiple selections',
      value: true,
    },
  },
};

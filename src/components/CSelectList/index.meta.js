export default {
  group: 'inputs',
  type: 'selectList',
  name: 'selectList',
  icon: 'featured_play_list',
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
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
      priority: 4,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip text',
      value: '',
      priority: 5,
    },
    readonly: {
      type: 'check',
      name: 'Enable readonly',
      value: false,
      priority: 6,
    },
    multiple: {
      type: 'check',
      name: 'Multiple selections',
      value: true,
      priority: 7,
    },
  },
};

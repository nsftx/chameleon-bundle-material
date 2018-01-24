export default {
  group: 'inputs',
  type: 'selectList',
  name: 'selectList',
  icon: 'featured_play_list',
  options: {
    label: {
      type: 'input',
      name: 'Select List Label',
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
      priority: 7,
    },
    multiple: {
      type: 'check',
      name: 'Multiple Selections',
      value: true,
      priority: 6,
    },
  },
};

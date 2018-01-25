export default {
  group: 'inputs',
  type: 'selectList',
  name: 'selectList',
  icon: 'featured_play_list',
  options: {
    label: {
      type: 'input',
      name: 'Select List Label',
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

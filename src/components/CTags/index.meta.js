export default {
  group: 'inputs',
  type: 'tags',
  name: 'Tags Select',
  icon: 'playlist_add_check',
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
  },
};

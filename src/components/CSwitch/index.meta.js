export default {
  group: 'inputs',
  type: 'switch',
  name: 'Switch',
  icon: 'sync',
  options: {
    label: {
      type: 'input',
      name: 'Switch Label',
      value: 'Switch',
      priority: 1,
    },
    color: {
      type: 'input',
      name: 'Color',
      value: 'primary',
      priority: 2,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: null,
      priority: 3,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 4,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 5,
    },
    disabled: {
      type: 'check',
      name: 'Disable Switch',
      value: false,
      priority: 6,
    },
  },
};

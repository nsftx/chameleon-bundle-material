export default {
  group: 'inputs',
  type: 'switch',
  name: 'Switch',
  icon: 'sync',
  actions: [
    {
      name: 'setInputValue',
      help: 'Switch input field updated',
    },
    {
      name: 'setItemDisabledValue',
      help: 'Input field disabled value',
    },
  ],
  events: [
    {
      name: 'Changed',
      help: 'Switch clicked, value changed',
    },
  ],
  options: {
    name: {
      type: 'input',
      name: 'Input Name',
      value: null,
      priority: 1,
    },
    label: {
      type: 'input',
      name: 'Switch Label',
      value: 'Switch',
      priority: 2,
    },
    color: {
      type: 'input',
      name: 'Color',
      value: 'primary',
      priority: 3,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: null,
      priority: 4,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 5,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 6,
    },
    disabled: {
      type: 'check',
      name: 'Disable Switch',
      value: false,
      priority: 7,
    },
  },
};

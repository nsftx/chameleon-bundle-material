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
    color: true,
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
    prependIcon: {
      type: 'iconSource',
      name: 'Prepend Icon',
      value: null,
      priority: 4,
    },
    appendIcon: {
      type: 'iconSource',
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

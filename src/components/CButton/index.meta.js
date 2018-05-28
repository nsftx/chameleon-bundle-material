export default {
  group: 'inputs',
  type: 'button',
  name: 'Button',
  icon: 'crop_landscape',
  events: [
    {
      name: 'Clicked',
      help: 'Fires when button is clicked',
    },
    {
      name: 'setItemDisabledValue',
      help: 'Input field disabled value',
    },
  ],
  options: {
    label: {
      type: 'input',
      name: 'Button Label',
      value: 'Button',
      priority: 1,
    },
    color: {
      type: 'input',
      name: 'Color',
      value: null,
      priority: 2,
    },
    icon: {
      type: 'check',
      name: 'Button As Icon',
      value: false,
      priority: 7,
    },
    round: {
      type: 'check',
      name: 'Round Button',
      value: false,
      priority: 6,
    },
    flat: {
      type: 'check',
      name: 'No Background',
      value: false,
      priority: 3,
    },
    block: {
      type: 'check',
      name: '100% Width',
      value: false,
      priority: 5,
    },
    depressed: {
      type: 'check',
      name: 'No Shadow',
      value: false,
      priority: 4,
    },
  },
};

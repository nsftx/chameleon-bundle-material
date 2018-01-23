export default {
  group: 'inputs',
  type: 'button',
  name: 'Button',
  icon: 'crop_landscape',
  options: {
    color: {
      type: 'input',
      name: 'Color',
      value: '',
      priority: 1,
    },
    icon: {
      type: 'check',
      name: 'Button as icon',
      value: false,
      priority: 6,
    },
    round: {
      type: 'check',
      name: 'Round button',
      value: false,
      priority: 5,
    },
    flat: {
      type: 'check',
      name: 'No background',
      value: false,
      priority: 2,
    },
    block: {
      type: 'check',
      name: '100% width',
      value: false,
      priority: 4,
    },
    depressed: {
      type: 'check',
      name: 'No shadow',
      value: false,
      priority: 3,
    },
  },
};

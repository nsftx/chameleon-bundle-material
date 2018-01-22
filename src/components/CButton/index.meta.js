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
    },
    icon: {
      type: 'check',
      name: 'Button as icon',
      value: false,
    },
    round: {
      type: 'check',
      name: 'Round button',
      value: false,
    },
    flat: {
      type: 'check',
      name: 'No background',
      value: false,
    },
    block: {
      type: 'check',
      name: '100% width',
      value: false,
    },
    depressed: {
      type: 'check',
      name: 'No shadow',
      value: false,
    },
  },
};

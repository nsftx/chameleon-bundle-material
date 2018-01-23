export default {
  group: 'inputs',
  type: 'slider',
  name: 'Slider',
  icon: 'settings_ethernet',
  options: {
    label: {
      type: 'input',
      name: 'Label text',
      value: '',
      priority: 1,
    },
    color: {
      type: 'input',
      name: 'Color',
      value: '',
      priority: 2,
    },
    trackColor: {
      type: 'input',
      name: 'Track color',
      value: '',
      priority: 3,
    },
    thumbColor: {
      type: 'input',
      name: 'Thumb color',
      value: '',
      priority: 4,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: '',
      priority: 5,
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
      priority: 6,
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
      priority: 7,
    },
    step: {
      type: 'input',
      name: 'Step value',
      value: 1,
      priority: 8,
    },
  },
};

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
    },
    color: {
      type: 'input',
      name: 'Color',
      value: '',
    },
    trackColor: {
      type: 'input',
      name: 'Track color',
      value: '',
    },
    thumbColor: {
      type: 'input',
      name: 'Thumb color',
      value: '',
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: '',
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
    },
    step: {
      type: 'number',
      name: 'Step value',
      value: 1,
      step: 1,
    },
  },
};

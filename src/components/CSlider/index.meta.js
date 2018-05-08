export default {
  group: 'inputs',
  type: 'slider',
  name: 'Slider',
  icon: 'settings_ethernet',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  options: {
    name: {
      type: 'input',
      name: 'Input Name',
      value: null,
      priority: 1,
    },
    label: {
      type: 'input',
      name: 'Slider Label',
      value: 'Slider',
      priority: 2,
    },
    color: {
      type: 'input',
      name: 'Color',
      value: '',
      priority: 3,
    },
    trackColor: {
      type: 'input',
      name: 'Track Color',
      value: '',
      priority: 4,
    },
    thumbColor: {
      type: 'input',
      name: 'Thumb Color',
      value: '',
      priority: 5,
    },
    thumbLabel: {
      type: 'check',
      name: 'Thumb Label',
      value: true,
      priority: 6,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: '',
      priority: 7,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: '',
      priority: 8,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: '',
      priority: 9,
    },
    step: {
      type: 'input',
      name: 'Step Value',
      value: 1,
      priority: 10,
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
      min: {
        type: 'input',
        name: 'Min Value',
        value: null,
      },
      max: {
        type: 'input',
        name: 'Max Value',
        value: null,
      },
    },
  },
};

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
  actions: [
    {
      name: 'setInputValue',
      help: 'Slider input field updated',
    },
    {
      name: 'setItemDisabledValue',
      help: 'Input field disabled value',
    },
  ],
  events: [
    {
      name: 'Changed',
      help: 'Slider scrolled, value changed',
    },
  ],
  options: {
    name: {
      type: 'fieldNameInput',
      name: 'Input Name',
      value: null,
      priority: 1,
      validation: {
        required: true,
      },
    },
    label: {
      type: 'input',
      name: 'Slider Label',
      value: 'Slider',
      priority: 2,
    },
    color: {
      type: 'colorPicker',
      name: 'Color',
      value: '',
      priority: 3,
    },
    trackColor: {
      type: 'colorPicker',
      name: 'Track Color',
      value: '',
      priority: 4,
    },
    thumbColor: {
      type: 'colorPicker',
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
      type: 'iconSource',
      name: 'Prepend Icon',
      value: '',
      priority: 7,
    },
    appendIcon: {
      type: 'iconSource',
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
        name: 'Required',
        value: false,
      },
      min: {
        type: 'input',
        name: 'Min Value',
        value: 0,
      },
      max: {
        type: 'input',
        name: 'Max Value',
        value: 100,
      },
    },
  },
};

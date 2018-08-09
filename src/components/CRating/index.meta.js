export default {
  group: 'inputs',
  type: 'rating',
  name: 'Rating',
  icon: 'star',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  actions: [
    {
      name: 'setRating',
      help: 'Rating value changed',
    },
  ],
  events: [
    {
      name: 'Changed',
      help: 'Rating clicked, value changed',
    },
  ],
  options: {
    color: {
      type: 'colorPicker',
      name: 'Color',
      value: '',
      priority: 2,
    },
    baseColor: {
      type: 'colorPicker',
      name: 'Base Color',
      value: 'grey',
      priority: 3,
    },
    name: {
      type: 'input',
      name: 'Input Name',
      value: null,
      priority: 1,
    },
    label: {
      type: 'input',
      name: 'Rating Label',
      value: 'How did you like our fat bunny',
      priority: 4,
    },
    maxRating: {
      type: 'input',
      name: 'Max Rating',
      value: 5,
      priority: 6,
    },
    ratingInfo: {
      type: 'check',
      name: 'Rating Info',
      value: true,
      priority: 7,
    },
    icon: {
      type: 'iconSource',
      name: 'Rating Icon',
      value: 'star',
      priority: 5,
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
    },
  },
};

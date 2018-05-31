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
      priority: 2,
    },
    maxRating: {
      type: 'input',
      name: 'Max Rating',
      value: 5,
      priority: 4,
    },
    ratingInfo: {
      type: 'check',
      name: 'Rating Info',
      value: true,
      priority: 5,
    },
    icon: {
      type: 'input',
      name: 'Rating Icon',
      value: 'star',
      priority: 3,
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

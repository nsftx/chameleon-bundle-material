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
    theme: true,
    backgroundColor: {
      type: 'colorPicker',
      name: 'Icon Background Color',
      value: 'accent',
      priority: 2,
    },
    color: {
      type: 'colorPicker',
      name: 'Icon Color',
      value: null,
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
      priority: 5,
    },
    ratingInfo: {
      type: 'check',
      name: 'Rating Value Info',
      value: true,
    },
    emptyIcon: {
      type: 'iconSource',
      name: 'Empty Rating Icon',
      value: 'star_border',
      priority: 6,
    },
    fullIcon: {
      type: 'iconSource',
      name: 'Full Rating Icon',
      value: 'star',
      priority: 7,
    },
    halfIcon: {
      type: 'iconSource',
      name: 'Half Rating Icon',
      value: 'star_half',
      priority: 8,
    },
    halfIncrements: {
      type: 'check',
      name: 'Selection Of Half Increments',
      value: true,
      priority: 9,
    },
    readonly: {
      type: 'check',
      name: 'Readonly',
      value: false,
      priority: 10,
    },
    hover: {
      type: 'check',
      name: 'Hover',
      value: true,
      priority: 11,
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

export default {
  group: 'inputs',
  type: 'rating',
  name: 'Rating',
  icon: 'star',
  options: {
    label: {
      type: 'input',
      name: 'Label text',
      value: 'How did you like our fat bunny',
    },
    maxRating: {
      type: 'number',
      name: 'Max rating',
      value: 5,
      step: 1,
    },
    ratingInfo: {
      type: 'check',
      name: 'Rating info',
      value: true,
    },
    icon: {
      type: 'input',
      name: 'Rating icon',
      value: 'star',
    },
  },
};

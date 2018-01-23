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
      priority: 1,
    },
    maxRating: {
      type: 'input',
      name: 'Max rating',
      value: 5,
      priority: 3,
    },
    ratingInfo: {
      type: 'check',
      name: 'Rating info',
      value: true,
      priority: 4,
    },
    icon: {
      type: 'input',
      name: 'Rating icon',
      value: 'star',
      priority: 2,
    },
  },
};

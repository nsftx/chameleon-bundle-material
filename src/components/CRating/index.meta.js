export default {
  group: 'inputs',
  type: 'rating',
  name: 'Rating',
  icon: 'star',
  options: {
    label: {
      type: 'input',
      name: 'Rating Label',
      value: 'How did you like our fat bunny',
      priority: 1,
    },
    maxRating: {
      type: 'input',
      name: 'Max Rating',
      value: 5,
      priority: 3,
    },
    ratingInfo: {
      type: 'check',
      name: 'Rating Info',
      value: true,
      priority: 4,
    },
    icon: {
      type: 'input',
      name: 'Rating Icon',
      value: 'star',
      priority: 2,
    },
  },
};

export default {
  group: 'widgets',
  type: 'luckysix',
  name: 'LuckySix',
  icon: 'group_work',
  options: {
    color: {
      type: 'select',
      name: 'Color',
      items: [
        {
          name: 'Indigo Blue',
          value: 230,
        },
        {
          name: 'Marine Blue',
          value: 215,
        },
        {
          name: 'Moulin Rouge',
          value: 340,
        },
        {
          name: 'Pepper Red',
          value: 0,
        },
        {
          name: 'Submarine Yellow',
          value: 40,
        },
        {
          name: 'Spring Green',
          value: 120,
        },
        {
          name: 'Polar Green',
          value: 150,
        },
      ],
      value: 230,
      priority: 1,
    },
    drum: {
      type: 'select',
      name: 'Drum Set',
      items: [
        {
          name: 'Solids',
          value: 'solids',
        },
        {
          name: 'Stripes',
          value: 'stripes',
        },
      ],
      value: 'solids',
      priority: 2,
    },
    quality: {
      type: 'select',
      name: 'Quality',
      items: [
        {
          name: 'Low',
          value: 'low',
        },
        {
          name: 'Medium',
          value: 'medium',
        },
        {
          name: 'High',
          value: 'high',
        },
      ],
      value: 'low',
      priority: 3,
    },
    language: {
      type: 'select',
      name: 'Language',
      items: [
        {
          name: 'English',
          value: 'en',
        },
        {
          name: 'Serbian Latin',
          value: 'sr-Latn',
        },
      ],
      value: 'en',
      priority: 3,
    },
  },
};

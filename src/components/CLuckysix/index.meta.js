export default {
  group: 'betting',
  type: 'luckysix',
  name: 'LuckySix',
  icon: 'group_work',
  options: {
    quality: {
      type: 'select',
      name: 'Quality',
      items: [
        {
          id: 1,
          name: 'Low',
          value: 'low',
        },
        {
          id: 2,
          name: 'Medium',
          value: 'medium',
        },
        {
          id: 3,
          name: 'High',
          value: 'high',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: 'low',
      priority: 1,
    },
  },
};

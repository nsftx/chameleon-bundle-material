export default {
  group: 'widgets',
  type: 'menu',
  name: 'Menu',
  icon: 'menu',
  options: {
    color: true,
    theme: true,
    layout: {
      type: 'select',
      name: 'Layout',
      items: [
        {
          name: 'mini',
          value: 'Mini',
        },
        {
          name: 'Normal',
          value: 'normal',
        },
      ],
      value: 'normal',
      priority: 1,
    },
    position: {
      type: 'select',
      name: 'Position',
      items: [
        {
          name: 'left',
          value: 'Left',
        },
        {
          name: 'Right',
          value: 'right',
        },
      ],
      value: 'left',
      priority: 2,
    },
    positionType: {
      type: 'select',
      name: 'Position Type',
      items: [
        {
          name: 'absolute',
          value: 'Absolute',
        },
        {
          name: 'Fixed',
          value: 'fixed',
        },
      ],
      value: 'fixed',
      priority: 3,
    },
  },
};

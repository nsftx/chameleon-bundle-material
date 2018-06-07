export default {
  group: 'widgets',
  type: 'menu',
  name: 'Menu',
  icon: 'menu',
  options: {
    color: true,
    theme: true,
    main: {
      type: 'check',
      name: 'Main Menu',
      value: false,
      priority: 1,
    },
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
      priority: 2,
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
      priority: 3,
    },
    height: {
      type: 'input',
      name: 'Height',
      value: null,
      priority: 4,
    },
    width: {
      type: 'input',
      name: 'Width',
      value: null,
      priority: 5,
    },
  },
};

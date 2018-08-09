export default {
  group: 'widgets',
  type: 'menu',
  name: 'Menu',
  icon: 'menu',
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when menu data source is changed',
    },
    {
      name: 'SelectedItemChanged',
      help: 'Fires when menu item gets selected',
    },
  ],
  options: {
    color: true,
    theme: true,
    main: {
      type: 'check',
      name: 'Main Menu',
      value: false,
      priority: 4,
    },
    title: {
      type: 'input',
      name: 'Title',
      value: 'Menu',
      priority: 5,
    },
    layout: {
      type: 'select',
      name: 'Layout',
      items: [
        {
          name: 'Mini',
          value: 'mini',
        },
        {
          name: 'Normal',
          value: 'normal',
        },
      ],
      value: 'normal',
      priority: 6,
    },
    position: {
      type: 'select',
      name: 'Position',
      items: [
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Right',
          value: 'right',
        },
      ],
      value: 'left',
      priority: 7,
    },
    height: {
      type: 'input',
      name: 'Height',
      value: null,
      priority: 8,
    },
    width: {
      type: 'input',
      name: 'Width',
      value: null,
      priority: 9,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      priority: 10,
    },
    icon: {
      type: 'iconSource',
      name: 'Icon',
      value: null,
    },
    autoGenerate: {
      type: 'check',
      group: 'data',
      name: 'Generate from Pages',
      value: false,
      priority: 11,
    },
  },
};

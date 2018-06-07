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
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      priority: 6,
    },
    autoGenerate: {
      type: 'check',
      name: 'Generate from Pages',
      value: false,
      priority: 7,
    },
  },
};

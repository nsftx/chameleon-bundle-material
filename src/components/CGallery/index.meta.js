const itemInterface = [
  {
    name: 'source',
    type: 'String',
    label: 'Source',
  },
];

export default {
  group: 'widgets',
  type: 'gallery',
  name: 'Gallery',
  icon: 'view_module',
  optionGroups: {
    carousel: {
      key: 'carousel',
      name: 'Carousel',
    },
    data: {
      key: 'data',
      name: 'Source',
    },
  },
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets table data source from event data',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when table data source is changed',
    },
  ],
  options: {
    color: true,
    name: {
      type: 'input',
      name: 'Name',
      value: 'gallery',
      priority: 1,
    },
    theme: true,
    itemHeight: {
      type: 'input',
      name: 'Item Height',
      value: '100px',
      priority: 4,
    },
    gridSize: {
      type: 'select',
      name: 'Type of grid system',
      value: 4,
      items: [
        {
          name: 'One',
          value: 12,
        },
        {
          name: 'Two',
          value: 6,
        },
        {
          name: 'Three',
          value: 4,
        },
        {
          name: 'Four',
          value: 3,
        },
        {
          name: 'Six',
          value: 2,
        },
        {
          name: 'Twelve',
          value: 1,
        },
      ],
      priority: 5,
    },
    contentSpacing: {
      type: 'select',
      name: 'Content Spacing',
      value: 'md',
      items: [
        {
          name: 'Extra-Small',
          value: 'xs',
        },
        {
          name: 'Small',
          value: 'sm',
        },
        {
          name: 'Medium',
          value: 'md',
        },
        {
          name: 'Large',
          value: 'lg',
        },
        {
          name: 'Extra-Large',
          value: 'xl',
        },
      ],
      priority: 6,
    },
    gridMaxSize: {
      type: 'check',
      name: 'Max Size',
      value: false,
      priority: 7,
    },
    imageSource: {
      type: 'imageSource',
      group: 'data',
      name: 'Image Source',
      value: '',
      priority: 8,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      priority: 9,
      schema: itemInterface,
    },
    carousel: {
      type: 'group',
      group: 'carousel',
      enable: {
        type: 'check',
        name: 'Enable',
        value: false,
      },
      priority: 10,
    },
  },
};

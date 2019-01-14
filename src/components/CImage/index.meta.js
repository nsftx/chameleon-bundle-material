const itemInterface = [
  {
    name: 'url',
    type: 'String',
    label: 'Url',
  },
];

export default {
  group: 'widgets',
  type: 'image',
  name: 'Image',
  icon: 'image',
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets table data source from event data',
    },
    {
      name: 'setImageSource',
      help: 'Sets image source from event data',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when table data source is changed',
    },
    {
      name: 'ImageSourceChanged',
      help: 'Fires when image source is changed',
    },
    {
      name: 'Clicked',
      help: 'Fires when image is clicked',
    },
  ],
  options: {
    color: true,
    theme: true,
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      schema: itemInterface,
      priority: 1,
    },
    src: {
      type: 'imageSource',
      name: 'Image source',
      value: null,
      priority: 2,
    },
    width: {
      type: 'sizeInput',
      name: 'Width',
      value: null,
      priority: 3,
    },
    height: {
      type: 'sizeInput',
      name: 'Height',
      value: null,
      priority: 4,
    },
    alternativeText: {
      type: 'Input',
      name: 'Alternative text',
      value: null,
      priority: 5,
    },
    contain: {
      type: 'check',
      name: 'Crop Image Size',
      value: false,
      priority: 6,
    },
  },
};

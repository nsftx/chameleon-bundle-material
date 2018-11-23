export default {
  group: 'containers',
  type: 'tabs',
  name: 'Tabs',
  icon: 'tab',
  children: [
    'tab-item',
  ],
  events: [
    {
      name: 'SelectedItemChanged',
      help: 'Tab selected',
    },
  ],
  options: {
    theme: true,
    itemsCount: {
      type: 'childrenCountInput',
      name: 'Item count',
      value: '1',
      validation: {
        required: true,
        min: 1,
      },
      priority: 1,
    },
    grow: {
      type: 'check',
      name: 'Tabs Full With',
      value: false,
      priority: 2,
    },
    alignment: {
      type: 'select',
      name: 'Tabs Position',
      items: [
        {
          id: 1,
          name: 'Left',
          value: '',
        },
        {
          id: 2,
          name: 'Right',
          value: 'right',
        },
        {
          id: 3,
          name: 'Center',
          value: 'center',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: '',
      priority: 3,
    },
    headerColor: {
      type: 'colorPicker',
      name: 'Item header color',
      value: null,
      priority: 4,
    },
    sliderColor: {
      type: 'colorPicker',
      name: 'Item slider color',
      value: null,
      priority: 5,
    },
    contentColor: {
      type: 'colorPicker',
      name: 'Item content color',
      value: null,
      priority: 6,
    },
  },
};

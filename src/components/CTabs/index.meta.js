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
    color: {
      type: 'colorPicker',
      name: 'Item header color',
      value: 'transparent',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      priority: 2,
    },
    contentColor: {
      type: 'colorPicker',
      name: 'Item content color',
      value: 'transparent',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      priority: 3,
    },
  },
};

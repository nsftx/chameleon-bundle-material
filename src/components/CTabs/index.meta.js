import { binding } from '@/utility';

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
      value: 1,
      validation: {
        required: true,
        min: 1,
      },
      priority: 1,
    },
    grow: {
      type: 'check',
      name: 'Tabs Full Width',
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
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= element.grow %>'),
      },
      priority: 3,
    },
    headerColor: {
      type: 'colorPicker',
      name: 'Header Color',
      value: null,
      priority: 4,
    },
    activeHeaderColor: {
      type: 'colorPicker',
      name: 'Active Text Header Color',
      value: null,
      priority: 4,
    },
    sliderColor: {
      type: 'colorPicker',
      name: 'Slider Color',
      value: null,
      priority: 5,
    },
    contentColor: {
      type: 'colorPicker',
      name: 'Content Color',
      value: null,
      priority: 6,
    },
  },
};

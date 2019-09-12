import { binding } from '@/utility';

export default {
  group: 'containers',
  type: 'accordion',
  name: 'Accordion',
  icon: 'view_day',
  children: [
    'accordion-item',
  ],
  events: [
    {
      name: 'SelectedItemChanged',
      help: 'Toggle of accordion child items',
    },
  ],
  options: {
    alternativeDesign: {
      type: 'select',
      name: 'Alternative design',
      items: [
        {
          id: 1,
          name: 'Default',
          value: '',
        },
        {
          id: 2,
          name: 'Inset',
          value: 'inset',
        },
        {
          id: 3,
          name: 'Popout',
          value: 'popout',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: '',
      priority: 4,
    },
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
    color: {
      type: 'colorPicker',
      name: 'Item header color',
      value: null,
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
      value: null,
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      priority: 3,
    },
    leaveOpen: {
      type: 'check',
      name: 'Always open on any click',
      value: true,
      priority: 5,
    },
    expandAll: {
      type: 'check',
      name: 'Expanded all items',
      value: false,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !element.leaveOpen %>'),
      },
      priority: 6,
    },
    theme: true,
  },
};

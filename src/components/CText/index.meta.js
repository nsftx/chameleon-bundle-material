import { isNil } from 'lodash';
import { binding } from '@/utility';

const expressionImport = {
  imports: {
    isNil,
  },
};

const itemInterface = [
  {
    name: 'text',
    type: 'String',
    label: 'Text',
  },
  {
    name: 'link',
    type: 'String',
    label: 'Link',
  },
];

export default {
  group: 'widgets',
  type: 'text',
  name: 'Text',
  icon: 'text_format',
  optionGroups: {
    behaviour: {
      key: 'behaviour',
      name: 'Behaviour',
      hidden: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= element.textStyle !== "a" %>'),
      },
    },
  },
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets text data source from event data',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when text data source is changed',
    },
  ],
  options: {
    textStyle: {
      type: 'select',
      name: 'Text Type',
      value: null,
      clearable: true,
      items: [
        {
          name: 'Bold',
          value: 'b',
        },
        {
          name: 'Italic',
          value: 'i',
        },
        {
          name: 'Strikethrough',
          value: 'del',
        },
        {
          name: 'Underline',
          value: 'ins',
        },
        {
          name: 'Link',
          value: 'a',
        },
      ],
      priority: 1,
    },
    text: {
      type: 'inputList',
      group: 'data',
      name: 'Text Source',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) %>', expressionImport),
      },
      priority: 2,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      schema: itemInterface,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.text) && element.text.length > 0 %>', expressionImport),
      },
      priority: 4,
    },
    link: {
      type: 'input',
      group: 'behaviour',
      name: 'Text Link Source',
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) %>', expressionImport),
      },
      value: null,
    },
    target: {
      type: 'select',
      name: 'Where To Open The Link',
      group: 'behaviour',
      value: null,
      clearable: true,
      items: [
        {
          name: 'New Tab',
          value: '_blank',
        },
        {
          name: 'Same Window',
          value: '_parent',
        },
      ],
    },
    color: {
      group: 'style',
      returnType: 'value',
      value: null,
      priority: 1,
    },
    textSize: {
      type: 'sizeInput',
      name: 'Text Size',
      group: 'style',
      value: '16px',
      priority: 2,
    },
    spacing: {
      type: 'select',
      name: 'Text Spacing Size',
      group: 'style',
      clearable: true,
      items: [
        {
          name: 'Extra Small',
          value: 1,
        },
        {
          name: 'Small',
          value: 2,
        },
        {
          name: 'Medium',
          value: 3,
        },
        {
          name: 'Large',
          value: 4,
        },
        {
          name: 'Extra Large',
          value: 5,
        },
      ],
      value: null,
      priority: 3,
    },
    spacingDirection: {
      type: 'select',
      name: 'Text Spacing Direction (Side)',
      group: 'style',
      clearable: true,
      items: [
        {
          name: 'All Directions',
          value: 'a',
        },
        {
          name: 'Top and Bottom',
          value: 'y',
        },
        {
          name: 'Left and Right',
          value: 'x',
        },
        {
          name: 'Top',
          value: 't',
        },
        {
          name: 'Right',
          value: 'r',
        },
        {
          name: 'Bottom',
          value: 'b',
        },
        {
          name: 'Left',
          value: 'l',
        },
      ],
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= isNil(element.spacing) %>', expressionImport),
      },
      priority: 4,
    },
    aligment: {
      type: 'select',
      name: 'Text Aligment',
      group: 'style',
      clearable: true,
      items: [
        {
          name: 'Left',
          value: 'text-xs-left',
        },
        {
          name: 'Right',
          value: 'text-xs-right',
        },
        {
          name: 'Center',
          value: 'text-xs-center',
        },
      ],
      value: null,
      priority: 5,
    },
  },
};

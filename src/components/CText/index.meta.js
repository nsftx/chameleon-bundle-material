import { isNil } from 'lodash';
import { binding } from '@utility';

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
];

export default {
  group: 'widgts',
  type: 'text',
  name: 'Text',
  icon: 'text-format',
  optionGroups: {
    data: {
      key: 'data',
      name: 'Data',
    },
    style: {
      key: 'style',
      name: 'Style',
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
    tooltip: {
      type: 'input',
      group: 'data',
      name: 'Text Tooltip',
      value: null,
    },
    text: {
      type: 'input',
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
        expression: binding.setExpression('<%= !isNil(element.value) && element.value.length > 0 %>', expressionImport),
      },
      priority: 1,
    },
    style: {
      type: 'group',
      group: 'style',
      color: {
        type: 'colorPicker',
        name: 'Text Color',
        value: null,
      },
      theme: {
        type: 'select',
        name: 'Theme',
        items: '=$themes',
        value: null,
      },
      textStyle: {
        type: 'select',
        name: 'Text Type',
        value: null,
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
            value: 'link',
          },
        ],
      },
      textSize: {
        type: 'sizeInput',
        name: 'Text Size',
        value: '16px',
      },
      link: {
        type: 'check',
        name: 'Show as link',
        value: false,
      },
    },
  },
};

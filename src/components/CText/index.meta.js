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
  {
    name: 'url',
    type: 'String',
    label: 'Url',
  },
];

export default {
  group: 'widgets',
  type: 'text',
  name: 'Text',
  icon: 'text_format',
  optionGroups: {
    data: {
      key: 'data',
      name: 'Data',
    },
    style: {
      key: 'style',
      name: 'Style',
    },
    url: {
      key: 'url',
      name: 'Url',
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
    urlText: {
      type: 'input',
      group: 'data',
      name: 'Text Url Source',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= element.textStyle !== "a" %>'),
      },
      priority: 3,
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
    target: {
      type: 'select',
      name: 'Where To Open The Link',
      group: 'url',
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
      priority: 1,
    },
    theme: {
      group: 'style',
      priority: 2,
    },
    textSize: {
      type: 'sizeInput',
      name: 'Text Size',
      group: 'style',
      value: '16px',
      priority: 3,
    },
  },
};

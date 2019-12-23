import { isNil, find, merge } from 'lodash';
import { binding } from '@/utility';
import baseCardMeta from '../BaseCard/index.meta';

const expressionImport = {
  imports: {
    isNil,
    find,
  },
};

const itemInterface = [
  {
    name: 'backgroundImage',
    type: 'Url',
    label: 'Background Image',
  },
  {
    name: 'icon',
    type: 'String',
    label: 'Thumbnail Icon',
  },
  {
    name: 'thumb',
    type: 'String',
    label: 'Thumbnail Image',
  },
  {
    name: 'image',
    type: 'String',
    label: 'Image',
  },
  {
    name: 'statusIcon',
    type: 'String',
    label: 'Status Icon',
  },
  {
    name: 'statusText',
    type: 'String',
    label: 'Status Text',
  },
  {
    name: 'subtitle',
    type: 'String',
    label: 'Subtitle',
  },
  {
    name: 'title',
    type: 'String',
    label: 'Title',
  },
  {
    name: 'indicatorColor',
    type: 'String',
    label: 'Indicator Color',
  },
];

export default merge({}, baseCardMeta, {
  options: {
    imageWidth: {
      type: 'sizeInput',
      name: 'Image Width',
      group: 'style',
      value: null,
      priority: 4,
    },
    imageHeight: {
      type: 'sizeInput',
      name: 'Image Height',
      group: 'style',
      value: null,
      priority: 5,
    },
    indicatorColor: {
      type: 'colorPicker',
      name: 'Indicator Color',
      group: 'style',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "indicatorColor"})) %>', expressionImport),
      },
      priority: 6,
    },
    variation: {
      type: 'select',
      name: 'Card Layout Variation',
      group: 'style',
      items: [
        {
          name: 'Header First',
          value: 'header',
        },
        {
          name: 'Image First',
          value: 'image',
        },
      ],
      returnObject: false,
      value: 'header',
    },
    title: {
      type: 'input',
      name: 'Card Title',
      group: 'data',
      value: 'I am Header',
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "title"})) %>', expressionImport),
      },
      validation: {
        required: true,
        // This is not defined inside builder!
        minLegth: 5,
      },
      priority: 1,
    },
    subtitle: {
      type: 'input',
      name: 'Card Subtitle',
      group: 'data',
      value: 'I am Subtitle',
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "subtitle"})) %>', expressionImport),
      },
      required: true,
      priority: 2,
    },
    statusText: {
      type: 'input',
      name: 'Card Status Text',
      group: 'data',
      value: 'I am Status',
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "statusText"})) %>', expressionImport),
      },
      required: true,
      priority: 3,
    },
    image: {
      type: 'imageSource',
      name: 'Image source',
      group: 'data',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "image"})) %>', expressionImport),
      },
      priority: 4,
    },
    statusIcon: {
      type: 'iconSource',
      name: 'Status Icon Source',
      group: 'data',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "statusIcon"})) %>', expressionImport),
      },
      priority: 5,
    },
    icon: {
      type: 'iconSource',
      name: 'Thumbnail Icon Source',
      group: 'data',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "icon"})) %>', expressionImport),
      },
      priority: 6,
    },
    thumb: {
      type: 'imageSource',
      name: 'Thumbnail Image Source',
      group: 'data',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "thumb"})) %>', expressionImport),
      },
      priority: 7,
    },
    backgroundImage: {
      type: 'imageSource',
      name: 'Card Background Image',
      group: 'data',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "backgroundImage"})) %>', expressionImport),
      },
      priority: 8,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Card Data Source',
      value: null,
      schema: itemInterface,
      priority: 9,
    },
  },
});

import { isNil } from 'lodash';
import { binding } from '@/utility';

const itemInterface = [
  {
    name: 'image',
    type: 'String',
    label: 'Image',
  },
  {
    name: 'thumb',
    type: 'String',
    label: 'Thumb',
  },
];

const expressionImport = {
  imports: {
    isNil,
  },
};

export default {
  group: 'widgets',
  type: 'gallery',
  name: 'Gallery',
  icon: 'view_module',
  optionGroups: {
    gallery: {
      key: 'gallery',
      name: 'Gallery',
    },
    carousel: {
      key: 'carousel',
      name: 'Carousel',
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
      priority: 4,
    },
    gridMaxSize: {
      type: 'check',
      name: 'Max Size',
      value: false,
      priority: 5,
    },
    imageSource: {
      type: 'gallerySource',
      group: 'data',
      name: 'Gallery Source',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) %>', expressionImport),
      },
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.imageSource) && element.imageSource.length > 0 %>', expressionImport),
      },
      schema: itemInterface,
    },
    gallery: {
      type: 'group',
      group: 'gallery',
      itemHeight: {
        type: 'sizeInput',
        name: 'Item Height',
        value: '100px',
      },
      contain: {
        type: 'check',
        name: 'Crop Image Size',
        value: false,
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
      },
    },
    carousel: {
      type: 'group',
      group: 'carousel',
      enabled: {
        type: 'check',
        name: 'Always Enabled',
        value: false,
      },
      cycle: {
        type: 'check',
        name: 'Should Cycle Through Images',
        value: true,
      },
      showControls: {
        type: 'check',
        name: 'Show The Navigation Controls',
        value: true,
      },
      hideDelimiters: {
        type: 'check',
        name: 'Hide Panel With Carousel Delimiters',
        value: false,
      },
      prevIcon: {
        type: 'iconSource',
        name: 'Displayed Icon For Pagination Previous Item',
        value: 'arrow_back',
      },
      nextIcon: {
        type: 'iconSource',
        name: 'Displayed Icon For Pagination Next Item',
        value: 'arrow_forward',
      },
      delimiterIcon: {
        type: 'iconSource',
        name: 'Icon For Carousel Delimiter',
        value: 'adjust',
      },
      interval: {
        type: 'select',
        name: 'The Duration Between Image Cycles',
        value: 6000,
        items: [
          {
            name: 'Default',
            value: 6000,
          },
          {
            name: 'Slow',
            value: 10000,
          },
          {
            name: 'Fast',
            value: 2000,
          },
        ],
      },
    },
  },
};

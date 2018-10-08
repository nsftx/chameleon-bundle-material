export default {
  type: 'page',
  name: 'Page',
  icon: 'browser',
  hidden: true,
  actions: [
    {
      name: 'navigateToPage',
      data: {
        page: {
          name: 'Page',
          type: 'select',
          valueType: 'string',
          items: '=$app.pages',
          itemValue: 'path',
          itemText: 'name',
        },
      },
    },
  ],
  events: [
    { name: 'Loading' },
  ],
  optionGroups: {
    layout: {
      key: 'layout',
      name: 'Layout',
    },
    meta: {
      key: 'meta',
      name: 'Meta',
    },
  },
  options: {
    name: {
      type: 'input',
      name: 'Name',
      value: null,
      priority: 1,
    },
    path: {
      type: 'input',
      name: 'Path',
      value: '/',
      priority: 2,
      validation: {
        required: true,
      },
    },
    parent: {
      type: 'select',
      name: 'Parent',
      value: null,
      displayProp: 'name',
      clearable: true,
      valueProp: 'name',
      items: '=$app.pages',
      filterItemsOut: '=$activePage.name',
      priority: 3,
    },
    icon: {
      type: 'iconSource',
      name: 'Icon',
      value: null,
      priority: 4,
    },
    landingPage: {
      type: 'check',
      name: 'Set as landing page',
      hint: 'Overrides root \'/\' path',
      value: false,
      priority: 5,
    },
    layout: {
      type: 'group',
      group: 'layout',
      fillHeight: {
        type: 'check',
        name: 'Full Page Height',
        value: false,
      },
      previewWidth: {
        type: 'sizeInput',
        name: 'Preview Width',
        value: '960px',
      },
      previewHeight: {
        type: 'sizeInput',
        name: 'Preview Height',
        value: '1360px',
      },
      overflow: {
        type: 'select',
        name: 'Preview Overflow',
        value: 'hidden',
        items: [
          {
            name: 'Hidden',
            value: 'hidden',
          },
          {
            name: 'Scroll',
            value: 'scroll',
          },
        ],
        priority: 6,
      },
    },
    meta: {
      type: 'group',
      group: 'meta',
      title: {
        type: 'input',
        name: 'Title',
        value: null,
      },
      description: {
        type: 'input',
        name: 'Description',
        value: null,
      },
      keywords: {
        type: 'input',
        name: 'Keywords',
        value: null,
      },
    },
    theme: true,
  },
};

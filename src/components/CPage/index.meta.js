export default {
  type: 'page',
  name: 'Page',
  icon: 'browser',
  optionGroups: {
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
    },
    parent: {
      type: 'select',
      name: 'Parent',
      value: null,
      displayProp: 'name',
      valueProp: 'name',
      items: '=$app.pages',
      priority: 3,
    },
    width: {
      type: 'input',
      name: 'Preview Width',
      value: 'auto',
      priority: 4,
    },
    height: {
      type: 'input',
      name: 'Preview Height',
      value: 'auto',
      priority: 5,
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
  },
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
};

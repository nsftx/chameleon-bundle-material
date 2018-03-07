export default {
  group: 'containers',
  type: 'navigation-drawer',
  name: 'Navigation Drawer',
  icon: 'menu',
  options: {
    height: {
      type: 'input',
      name: 'Navigation Height',
      value: '100%',
    },
    width: {
      type: 'input',
      name: 'Navigation Width',
      value: '300',
    },
    fixed: {
      type: 'check',
      name: 'Fixed Menu',
      value: false,
    },
    permanent: {
      type: 'check',
      name: 'Always Visible',
      value: false,
    },
    right: {
      type: 'check',
      name: 'Place Navigation On Right',
      value: false,
    },
    mobileBreakPoint: {
      type: 'select',
      name: 'Mobile Break Point',
      value: {
        id: 1,
          value: '1264',
          label: '1264',
      },
      items: [
        {
          id: 1,
          value: '1264',
          label: '1264',
        },
      ],
      displayProp: 'label',
      valueProp: 'value',
    },
  },
};

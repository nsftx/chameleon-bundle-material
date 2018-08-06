export default {
  group: 'widgets',
  type: 'gallery',
  name: 'Gallery',
  icon: 'view_module',
  optionGroups: {
  },
  actions: [
  ],
  events: [
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
    carousel: {
      type: 'check',
      name: 'Carousel',
      value: false,
      priority: 2,
    },
  },
};

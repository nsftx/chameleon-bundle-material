export default {
  group: 'widgets',
  type: 'image',
  name: 'Image',
  icon: 'image',
  actions: [
    {
      name: 'setImageSource',
      help: 'Sets image source from event data',
    },
  ],
  events: [
    {
      name: 'ImageSourceChanged',
      help: 'Fires when image source is changed',
    },
  ],
  options: {
    src: {
      type: 'imageSource',
      name: 'Image source',
      value: null,
      priority: 2,
    },
    width: {
      type: 'input',
      name: 'Width',
      value: null,
      priority: 3,
    },
    height: {
      type: 'input',
      name: 'Height',
      value: null,
      priority: 4,
    },
  },
};

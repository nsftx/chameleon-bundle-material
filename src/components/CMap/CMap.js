import { isString, merge } from 'lodash';
import namespace from '@namespace';
import { dependable, elementable } from '@mixins';

export default {
  name: `${namespace}map`,
  mixins: [
    dependable,
    elementable,
  ],
  props: {
    height: {
      type: String,
      default: '400px',
    },
    width: {
      type: String,
      default: '100%',
    },
    options: {
      type: Object,
    },
  },
  methods: {
    load() {
      const options = merge({
        center: { lat: 43.352848, lng: 17.793627 },
        zoom: 10,
      }, this.options);

      const map = new window.google.maps.Map(this.$refs.map, options);

      this.$emit('ready', map);
    },
  },
  render(createElement) {
    return createElement('div', {
      ref: 'map',
      attrs: this.getSchemaAttributes(),
      style: {
        width: this.definition.width || this.width,
        height: this.definition.height || this.height,
      },
      staticClass: `${this.baseClass} ${this.$options.name}`,
    });
  },
  mounted() {
    const apiKey = this.definition.apiKey;
    const lib = this.definition.libraries;
    const libraries = isString(lib) ? lib : lib.join(',');
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}`;

    this.loadDependencies(url, 'CMap').then(() => {
      this.load();
    });
  },
};

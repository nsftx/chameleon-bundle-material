import { isString, merge, isNil } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  props: {
    height: {
      type: String,
      default: '400px',
    },
    width: {
      type: String,
      default: '100%',
    },
    mapOptions: {
      type: Object,
    },
  },
  methods: {
    load() {
      const options = merge({
        center: { lat: 43.352848, lng: 17.793627 },
        zoom: 10,
      }, this.mapOptions);

      const map = new window.google.maps.Map(this.$refs.map, options);

      this.$emit('ready', map);
    },
  },
  render() {
    const data = {
      ref: 'map',
      style: {
        width: this.definition.width || this.width,
        height: this.definition.height || this.height,
      },
    };

    return this.renderElement('div', data);
  },
  mounted() {
    const apiKey = this.definition.apiKey;
    const lib = this.definition.libraries;
    const libraries = isString(lib) || isNil(lib) ? lib : lib.join(',');
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}`;

    this.loadDependencies(url, 'google.maps').then(() => {
      this.load();
    });
  },
};

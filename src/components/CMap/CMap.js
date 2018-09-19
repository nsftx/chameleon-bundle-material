import { isString, merge, isNil } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  props: {
    mapOptions: {
      type: Object,
    },
  },
  data() {
    return {
      apiKey: null,
    };
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
    activateMap() {
      if (isNil(this.apiKey)) return;

      const lib = this.config.libraries;
      const libraries = isString(lib) || isNil(lib) ? lib : lib.join(',');
      const url = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=${libraries}`;

      this.loadDependencies(url, 'google.maps').then(() => {
        this.load();
      });
    },
  },
  computed: {
    configApiKey() {
      return this.config.apiKey;
    },
  },
  render() {
    const data = {
      ref: 'map',
      style: {
        width: '100%',
        height: '100%',
      },
    };

    return this.renderElement('div', data);
  },
  watch: {
    configApiKey(key) {
      if (!isNil(key)) {
        this.apiKey = key;
        this.activateMap();
      }
    },
  },
};

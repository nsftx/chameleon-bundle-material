import _ from 'lodash';
import namespace from '@namespace';

export default {
  name: `${namespace}map`,
  props: {
    apiKey: {
      type: String,
    },
    libraries: {
      type: [String, Array],
      default() {
        return [];
      },
    },
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
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    load() {
      // Server side rendering
      if (_.isUndefined(window)) return true;

      // Dynamically load map script
      if (!this.isLoaded && (!window.google || !window.google.maps)) {
        const script = document.createElement('SCRIPT');
        const libraries = _.isString(this.libraries) ? this.libraries : this.libraries.join(',');
        const url = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=${libraries}&callback=CMapLoaded`;

        script.setAttribute('src', url);
        script.setAttribute('async', null);
        script.setAttribute('defer', null);
        document.body.appendChild(script);

        window.CMapLoaded = this.setLoaded.bind(this);
      }

      return true;
    },
    setLoaded() {
      this.isLoaded = true;
    },
  },
  watch: {
    isLoaded(value) {
      if (value) {
        const options = _.merge({
          center: { lat: 43.352848, lng: 17.793627 },
          zoom: 10,
        }, this.options);

        const map = new window.google.maps.Map(this.$refs.map, options);

        this.$emit('ready', map);
      }
    },
  },
  mounted() {
    this.load();
  },
  render(createElement) {
    return createElement('div', {
      ref: 'map',
      style: {
        width: this.width,
        height: this.height,
      },
    });
  },
};

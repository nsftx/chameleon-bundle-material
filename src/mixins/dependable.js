import _ from 'lodash';

export default {
  data() {
    return {
      dependables: [],
    };
  },
  methods: {
    get(url, globals, callback, errorCallback) {
      let type = null;
      let attr = null;
      const invokeCallback = () => {
        this.dependables[globals] = true;

        if (_.isFunction(callback)) {
          callback();
        }
      };

      type = url.type === 'script' || _.isUndefined(url.type) ? 'script' : 'link';
      attr = url.type === 'script' || _.isUndefined(url.type) ? 'src' : 'href';
      const script = document.createElement(type);

      script.onload = () => {
        invokeCallback();
      };

      script.onerror = (e) => {
        this.dependables[globals] = false;
        console.warn('Load script error ', e);
        if (_.isFunction(errorCallback)) {
          errorCallback();
        }
      };

      script.setAttribute(attr, url.src || url);

      if (url.type === 'script' || _.isUndefined(url.type)) {
        document.body.appendChild(script);
      } else if (url.type === 'link') {
        script.rel = 'stylesheet';
        script.type = 'text/css';
        document.head.appendChild(script);
      }
    },
    loadDependencies(url, globals) {
      if (_.isArray(url)) {
        let p = Promise.resolve(true);
        const self = this;

        url.forEach((src) => {
          p = p.then(() => self.loadDependencies(src));
        });

        return p;
      }
      return new Promise((resolve, reject) => {
        this.get(url, globals, () => resolve(true), () => reject());
      });
    },
  },
};

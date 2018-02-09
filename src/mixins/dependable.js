import _ from 'lodash';

const setFlag = (globals, prop, value) => {
  _.merge(window, {
    // eslint-disable-next-line
    '__CHAMELEON_MATERIAL_DEPS__': { [globals]: { [prop]: value } },
  });
};
const depPromises = [];
const urlPromises = [];

export default {
  methods: {
    set(url, globals, resolve, reject) {
      let type = null;
      let attr = null;
      type = url.type === 'script' || _.isUndefined(url.type) ? 'script' : 'link';
      attr = url.type === 'script' || _.isUndefined(url.type) ? 'src' : 'href';
      const script = document.createElement(type);

      script.setAttribute(attr, url.src || url);

      if (url.type === 'script' || _.isUndefined(url.type)) {
        document.body.appendChild(script);
      } else if (url.type === 'link') {
        script.rel = 'stylesheet';
        script.type = 'text/css';
        document.head.appendChild(script);
      }

      script.onerror = () => {
        reject();
        setFlag(globals, 'loaded', false);
        setFlag(globals, 'started', false);
      };

      script.onload = () => {
        resolve();
      };
    },
    getEach(url, globals) {
      if (_.isArray(url)) {
        url.forEach((src) => {
          this.getEach(src, globals);
        });
      } else {
        urlPromises.push(new Promise((resolve, reject) => {
          this.set(url, globals, resolve, reject);
        }));
      }
    },
    loadDependencies(url, globals) {
      depPromises.push(new Promise((resolve) => {
        // eslint-disable-next-line
        if (!_.isUndefined(window.__CHAMELEON_MATERIAL_DEPS__) && !_.isUndefined(window.__CHAMELEON_MATERIAL_DEPS__[globals]) && window.__CHAMELEON_MATERIAL_DEPS__[globals].started) {
          const interval = setInterval(() => {
            // eslint-disable-next-line
            if (window.__CHAMELEON_MATERIAL_DEPS__[globals].loaded) {
              clearInterval(interval);
              resolve();
            }
          }, 10);
        } else {
          setFlag(globals, 'started', true);
          this.getEach(url, globals);
          resolve();
        }
      }));
      return Promise.all(urlPromises).then(() => {
        setFlag(globals, 'loaded', true);
      }).then(() => Promise.all(depPromises));
    },
  },
};

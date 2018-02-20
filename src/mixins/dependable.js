import { isArray, isUndefined, merge } from 'lodash';

const setFlag = (globals, prop, value) => {
  merge(window, {
    // eslint-disable-next-line
    __CHAMELEON_MATERIAL_DEPS__: { [globals]: { [prop]: value } },
  });
};

const depPromises = [];
const urlPromises = [];

const setDependency = (url, globals, resolve, reject) => {
  const type = url.type === 'script' || isUndefined(url.type) ? 'script' : 'link';
  const attr = url.type === 'script' || isUndefined(url.type) ? 'src' : 'href';
  const script = document.createElement(type);

  script.setAttribute(attr, url.src || url);

  if (url.type === 'script' || isUndefined(url.type)) {
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
};

const getDependencies = (url, globals) => {
  if (isArray(url)) {
    url.forEach((src) => {
      getDependencies(src, globals);
    });
  } else {
    urlPromises.push(new Promise((resolve, reject) => {
      setDependency(url, globals, resolve, reject);
    }));
  }
};

export default {
  methods: {
    loadDependencies(url, globals) {
      depPromises.push(new Promise((resolve, reject) => {
        // eslint-disable-next-line
        let depsGlobal = window.__CHAMELEON_MATERIAL_DEPS__;
        if (
          !isUndefined(depsGlobal) &&
          !isUndefined(depsGlobal[globals]) &&
          depsGlobal[globals].started
        ) {
          const interval = setInterval(() => {
            // eslint-disable-next-line
            if (depsGlobal[globals].loaded) {
              clearInterval(interval);
              resolve();
              // eslint-disable-next-line
            } else if (depsGlobal[globals].loaded === false) {
              clearInterval(interval);
              reject();
            }
          }, 10);
        } else {
          setFlag(globals, 'started', true);
          getDependencies(url, globals);
          resolve();
        }
      }));

      return Promise.all(urlPromises).then(() => {
        setFlag(globals, 'loaded', true);
      })
        .then(() => Promise.all(depPromises))
        .catch((error) => {
          console.warn('[CV] Script rejected =>', error);
        });
    },
  },
};

import VideoStream from './CVideoStream';

export default {
  install(Vue, options) {
    const name = `${options.namespace}video-stream`;

    Vue.component(name, {
      extends: VideoStream,
      namespace: options.namespace,
      name,
    });
  },
};

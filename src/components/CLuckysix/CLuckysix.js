/*
This element is just for testing.
It will be moved to separate bundle.
*/

/*
Default options if in some case plugin does not receive them.
*/
const optionDefaults = {
  // No need to expose this as it is fixed.
  baseUrl: 'https://seven-plugin-luckysix.7platform.com',
  language: 'en',
  quality: 'low',
  color: 145,
  drum: 'solids',
};

/*
Option platform is not exposed as it is too complex for end-user.
This would have to be handled by letting end-user choose profile
depending on permissions on betting platform.
*/
const optionPlatform = {
  url: 'https://cm-rs.7platform.com:8008',
  id: '00301e05-af1a-4cd3-8690-3ff5c362aa72',
  token: 'token',
  channel: 'edc5da0d-86f0-47bd-8e6f-1bfb17b78b9d',
  company: '4f54c6aa-82a9-475d-bf0e-dc02ded89225',
  clientType: 'user',
  clientSubType: 'Player',
  encoding: 'plaintext',
};

export default {
  name: 'c-luckysix',
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    url() {
      const optionPlatformQuery = encodeURIComponent(JSON.stringify(optionPlatform));
      const optionLanguage = this.definition.language || optionDefaults.language;
      const optionQuality = this.definition.quality || optionDefaults.quality;
      const optionColor = this.definition.color || optionDefaults.color;
      const optionDrum = this.definition.drum || optionDefaults.drum;

      return `${optionDefaults.baseUrl}/?mode=plugin&dnb=${optionDrum}&colors=${optionColor}&q=${optionQuality}&lang=${optionLanguage}&company=${optionPlatform.company}&scm=${optionPlatformQuery}`;
    },
  },
  methods: {
  },
  render(createElement) {
    return createElement(
      'div',
      {
        staticClass: this.name,
        staticStyle: {
          width: '100%',
          height: 0,
          paddingTop: '56.25%',
          position: 'relative',
          overflow: 'hidden',
        },
      },
      [
        createElement(
          'iframe',
          {
            attrs: {
              src: this.url,
              frameborder: 0,
              scrolling: 'no',
              width: '100%',
              height: '100%',
              // Experimental attribute for research.
              sandbox: 'allow-same-origin allow-scripts',
            },
            staticStyle: {
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            },
          },
        ),
      ],
    );
  },
};

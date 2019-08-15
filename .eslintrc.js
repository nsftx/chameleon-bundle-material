module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  plugins: [
    'html',
    'vuetify',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    JSONEditor: true,
    moment: true,
    Quill: true,
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'no-underscore-dangle': ['error', {
      allow: [
        '_id',
        '_schema',
      ],
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Vue-specific rules
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never',
    }],
    'vue/max-attributes-per-line': ['error', {
      'multiline': {
        allowFirstLine: true,
      }
    }],
    // vuetify v2.0.0 rules
    'vuetify/grid-unknown-attributes': 'error',
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/no-legacy-grid': 'error',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('@vue/cli-service/webpack.config.js'),
      },
    },
  },
};

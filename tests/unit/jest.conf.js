const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@locale': '<rootDir>/src/locale',
    '@mixins': '<rootDir>/src/mixins',
    '@components': '<rootDir>/src/components',
    '@validators': '<rootDir>/src/validators',
    '@namespace': '<rootDir>/src/index.namespace',
    '@utility': '<rootDir>/src/utility',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@nsoft)'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/tests/e2e',
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/tests/unit/setup'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/index.js',
    '!package-lock.json',
    '!src/router/index.js',
    '!**/node_modules/**',
  ],
};

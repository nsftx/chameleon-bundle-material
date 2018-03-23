import { each } from 'lodash';
import { mount, createLocalVue } from 'vue-test-utils';
import * as components from '@/components';

const definitions = require('../../../dev/data/page.json');
const options = {
  namespace: 'c-',
};
const validators = definitions.validators;

describe('AllComponents', () => {
  let createCmp;
  
  each(components, (component, key) => {
    const localVue = createLocalVue();
    localVue.use(component, options);

    each(localVue.options.components, (type, key) => {
      createCmp = mount(type, {
        // Required prop definition
        propsData: {
          definition: {
            validation: {},
          },
        },
        // Some components require global validators
        mocks: {
          $chameleon: {
            validators,
          },
          form: {},
        },
      });

      it('Check if contains base class c-element', () => {
        expect(createCmp.classes()).toContain('c-element');
      });
    });
  });
});

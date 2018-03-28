import { each, isNil, assign } from 'lodash';
import { shallow, createLocalVue } from 'vue-test-utils';
import * as components from '@/components';

const options = {
  namespace: 'c-',
};

const mockDefinition = require('./__mocks__/definition');

describe('AllComponents', () => {
  each(components, (component, key) => {
    const localVue = createLocalVue();
    localVue.use(component, options);

    const cmpName = Object.keys(localVue.options.components)[0];
    const cmp = localVue.options.components[cmpName];
    const cmpDefinition = mockDefinition[cmpName];
    const type = cmpDefinition._schema.type;
    const group = cmpDefinition._schema.group;
    const definition = assign(
      { type },
      cmpDefinition,
    );
    // Mount component
    const wrapper = shallow(cmp, {
      // Required prop definition
      propsData: {
        definition,
      },
      // Some components require global validators
      mocks: {
        $chameleon: {
          validators: {},
        },
        form: {},
      },
    });

    it(`Check if ${cmpName} contains data attributes`, () => {
      const attrs = wrapper.attributes();
      expect([attrs]).toContainEqual(expect.objectContaining(
        { 'data-type': type },
        { 'data-group': group },
        { 'data-uid': expect.anything() },
      ));
    });
  });
});

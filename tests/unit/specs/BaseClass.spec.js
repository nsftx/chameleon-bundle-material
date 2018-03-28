import { each } from 'lodash';
import { shallow, createLocalVue } from 'vue-test-utils';
import * as components from '@/components';

const options = {
  namespace: 'c-',
};

describe('AllComponents', () => {
  each(components, (component, key) => {
    const localVue = createLocalVue();
    localVue.use(component, options);

    const cmpName = Object.keys(localVue.options.components)[0];
    const cmp = localVue.options.components[cmpName];
    const wrapper = shallow(cmp, {
      // Required prop definition
      propsData: {
        definition: {},
      },
      // Some components require global validators
      mocks: {
        $chameleon: {
          validators: {},
        },
        form: {},
      },
    });

    it(`Check if ${cmpName} contains base class c-element`, async () => {
      const resolvingPromise = new Promise((resolve) => {
        resolve();
      });
      const result = await resolvingPromise;
      expect(wrapper.classes()).toContain('c-element');
    });
  });
});

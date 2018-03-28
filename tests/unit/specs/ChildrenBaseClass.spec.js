import { each } from 'lodash';
import { mount, createLocalVue } from 'vue-test-utils';
import { CAccordionItem, CFlexgridItem, CForm, CHlist, CPanel, CTabItem, CVlist } from '@/components';

const options = {
  namespace: 'c-',
};

const components = [ CAccordionItem, CFlexgridItem, CForm, CHlist, CPanel, CTabItem, CVlist ];

describe('ChildrenComponents', () => {
  each(components, (component, key) => {
    const localVue = createLocalVue();
    localVue.use(component, options);

    const cmpName = Object.keys(localVue.options.components)[0];
    const cmp = localVue.options.components[cmpName];
    const wrapper = mount(cmp, {
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

    it(`Check if ${cmpName} contains base children class c-element-children`, () => {
      expect(wrapper.find(`.${cmpName}`).contains('.c-element-children')).toBe(true);
    });

  });
});

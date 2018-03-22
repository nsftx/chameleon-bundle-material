import { mount } from 'vue-test-utils';
import CSample from '@/components/Chtml/CHtml';

describe('CSample', () => {
  it('check default message property', () => {
    const createCmp = mount(CSample, {
      propsData: {
        definition: {
          "name": "htmlMarkup",
          "type": "html",
          "label": "Html Markup",
          "value": "<h1>This is heading 1</h1>"
        },
      },
    });
    expect(createCmp.vm.definition.name).toEqual('htmlMarkup');
  });
});

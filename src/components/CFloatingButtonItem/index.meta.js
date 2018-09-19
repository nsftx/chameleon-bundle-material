import { merge } from 'lodash';
import CButton from '../CButton/index.meta';

export default merge({}, CButton, {
  group: 'actions',
  type: 'floating-button-item',
  name: 'Floating Button Item',
  icon: 'control_point',
  hidden: true,
  options: {
    block: false,
    displayAsIcon: {
      value: true,
    },
    icon: {
      value: 'add_circle',
    },
  },
});

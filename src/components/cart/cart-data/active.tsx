import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  items: Array<object | null>;
  addItem: Function;
  removeItem: Function;
  changeQuantity: Function;
  showCart: boolean;
  handleCartMenuClick: Function;
}

export default createProviderConsumer<State>(
  {
    items: [],
    addItem: () => null,
    removeItem: () => null,
    changeQuantity: () => null,
    showCart: false,
    handleCartMenuClick: () => null,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />,
);

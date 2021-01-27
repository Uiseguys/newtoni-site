import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  items: Array<object | null>;
  addItem: Function;
  removeItem: Function;
  removeAllItems: Function;
  changeQuantity: Function;
  showCart: boolean;
  handleCartMenuClick: Function;
  transactionState: boolean;
  changeTransaction: Function;
}

export default createProviderConsumer<State>(
  {
    items: [],
    addItem: () => null,
    removeItem: () => null,
    removeAllItems: () => null,
    changeQuantity: () => null,
    showCart: false,
    handleCartMenuClick: () => null,
    transactionState: false,
    changeTransaction: () => null,
  },
  (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />,
);

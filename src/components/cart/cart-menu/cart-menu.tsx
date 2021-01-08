import { Component, Prop, State, Watch, Element, h } from '@stencil/core';
import Tunnel from '../../cart/cart-data/active';

@Component({
  tag: 'cart-menu',
  styleUrl: 'cart-menu.scss',
})
export class CartMenu {
  @Element() el: CartMenu;
  @Prop() showCart: boolean;
  @Prop() handleCartMenuClick: Function;

  render() {
    return (
      <div class="cart-menu container">
        <button class="btn cart-button p-0" onClick={_ => this.handleCartMenuClick()}>
          Cart (0)
        </button>
      </div>
    );
  }
}

Tunnel.injectProps(CartMenu, ['showCart', 'handleCartMenuClick']);

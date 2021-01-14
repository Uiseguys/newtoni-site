import { Component, Prop, Element, h } from '@stencil/core';
import Tunnel from '../../cart/cart-data/active';

@Component({
  tag: 'cart-menu',
  styleUrl: 'cart-menu.scss',
})
export class CartMenu {
  @Element() el: CartMenu;
  @Prop() showCart: boolean;
  @Prop() handleCartMenuClick: Function;
  @Prop() items: Array<any>;

  render() {
    return (
      <div class="cart-menu container">
        <button class="btn cart-button p-0" onClick={_ => this.handleCartMenuClick()}>
          Cart ({this.items.length})
        </button>
      </div>
    );
  }
}

Tunnel.injectProps(CartMenu, ['showCart', 'handleCartMenuClick', 'items']);

import { Component, Prop, State, Watch, Element, h } from '@stencil/core';
import Tunnel from '../../cart/cart-data/active';

@Component({
  tag: 'cart-sidebar',
  styleUrl: 'cart-sidebar.scss',
})
export class CartSidebar {
  @Element() el: CartSidebar;
  @Prop() showCart: boolean;
  @Prop() handleCartMenuClick: Function;

  render() {
    return (
      <div class={this.showCart ? 'cart active' : 'cart'}>
        <div class="close-cart">
          <button class="btn bold" onClick={_ => this.handleCartMenuClick()}>
            Close Cart
          </button>
        </div>
        <div class="cart-summary">
          <div class="cart-item">
            <div class="remove-item">
              <a href="#">x</a>
            </div>
            <div class="name">
              <span>Poster edition</span>
            </div>
            <div class="cost">
              <span>65€</span>
            </div>
            <div class="quantity">
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Tunnel.injectProps(CartSidebar, ['showCart', 'handleCartMenuClick']);

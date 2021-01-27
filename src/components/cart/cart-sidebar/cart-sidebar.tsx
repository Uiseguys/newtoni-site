import { Component, Prop, State, Element, h } from '@stencil/core';
import Tunnel from '../../cart/cart-data/active';

@Component({
  tag: 'cart-sidebar',
  styleUrl: 'cart-sidebar.scss',
})
export class CartSidebar {
  @Element() el: CartSidebar;
  @Prop() showCart: boolean;
  @Prop() items: Array<any>;
  @Prop() handleCartMenuClick: Function;
  @Prop() changeQuantity: Function;
  @Prop() removeItem: Function;
  @State() stateChanged: any;

  renderCartItems = () => {
    return this.items.map((item, index) => {
      const changeItemQuantity = this.changeQuantity;
      const removeCartItem = this.removeItem;
      const selectOptions = [];
      for (let i = 0; i < 10; i++) {
        const isSelected = i + 1 == item.quantity ? { selected: true } : Object.create(null);
        selectOptions[i] = (
          <option value={i + 1} {...isSelected}>
            {i + 1}
          </option>
        );
      }
      return (
        <div class="cart-item row">
          <div class="remove-item col-2">
            <button class="btn p-0" onClick={_ => removeCartItem(item)}>
              x
            </button>
          </div>
          <div class="name col-4">
            <span>{item.name}</span>
          </div>
          <div class="cost col-2">
            <span>{item.price} €</span>
          </div>
          <div class="quantity col-2">
            <label htmlFor={`select-quantity-${index}`}>x&nbsp;</label>
            <select
              id={`select-quantity-${index}`}
              onChange={function (_) {
                const currentSelectValue = this.options[this.selectedIndex].value;
                changeItemQuantity({ ...item, quantity: currentSelectValue });
              }}
            >
              {selectOptions}
            </select>
          </div>
          <div class="subtotal col-2">
            <span>{item.price * item.quantity} €</span>
          </div>
        </div>
      );
    });
  };

  renderSubtotal = () => {
    const subtotal = this.items.reduce((acc, item) => {
      acc = item.price * item.quantity + acc;
      return acc;
    }, 0);
    if (subtotal) return subtotal;
    return 0;
  };

  render() {
    return (
      <div class={this.showCart ? 'cart active' : 'cart'}>
        <div class="close-cart">
          <button class="btn bold p-0" onClick={_ => this.handleCartMenuClick()}>
            Close Cart
          </button>
        </div>
        <div class="cart-summary">{this.renderCartItems()}</div>
        <div class="cart-subtotal font-weight-bold row">
          <span class="col-8">Subtotal</span>
          <span class="col-2">{this.renderSubtotal()} €</span>
        </div>
        <div class="cart-checkout">
          <stencil-route-link url="/checkout" class={`btn p-0${!this.items.length ? ' disabled remove-pointer-events' : ''}`} exact={true}>
            Checkout
          </stencil-route-link>
        </div>
      </div>
    );
  }
}

Tunnel.injectProps(CartSidebar, ['showCart', 'handleCartMenuClick', 'items', 'changeQuantity', 'removeItem']);

import { Component, Prop, State, Element, h } from '@stencil/core';
import Tunnel from '../../cart/cart-data/active';
import allCountries from './countries.js';

@Component({
  tag: 'checkout-page',
  styleUrl: 'checkout-page.scss',
})
export class CheckoutPage {
  @Element() el: CheckoutPage;
  @Prop() items: Array<any>;
  @State() shipToDifferent: number;

  handleDifferentAddressCheck = () => {
    this.shipToDifferent > 0 ? (this.shipToDifferent = 0) : (this.shipToDifferent = 1);
  };

  renderItems = () =>
    this.items.map(item => (
      <li class="list-group-item">
        <div class="row">
          <div class="col-6">
            <span>
              {item.name} x{item.quantity}
            </span>
          </div>
          <div class="col-6">
            <span>{item.price * item.quantity} €</span>
          </div>
        </div>
      </li>
    ));

  renderSubtotal = () => {
    const subtotal = this.items.reduce((acc, item) => {
      acc = item.price * item.quantity + acc;
      return acc;
    }, 0);
    if (subtotal) return subtotal;
    return 0;
  };

  calculateShipping = () => {
    return 4;
  };

  renderFormAddress = (alt: boolean) => (
    <div>
      <div class="form-group">
        <input type="text" class="form-control" id={`first-name${alt ? '-alt' : ''}`} placeholder="First Name *" required={true} />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id={`last-name${alt ? '-alt' : ''}`} placeholder="Last Name *" required={true} />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id={`company-name${alt ? '-alt' : ''}`} placeholder="Company name optional" />
      </div>
      <div class="form-group">
        <select class="form-control" id={`country${alt ? '-alt' : ''}`}>
          {allCountries.map(val => {
            const optionProps = val.code == 'DE' ? { selected: true } : Object.create(null);
            return (
              <option value={val.code} {...optionProps}>
                {val.name}
              </option>
            );
          })}
        </select>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id={`street-address${alt ? '-alt' : ''}`} placeholder="Street address *" required={true} />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id={`street-address2${alt ? '-alt' : ''}`} placeholder="street address 2 (optional)" />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id={`zip${alt ? '-alt' : ''}`} placeholder="Postcode / ZIP *" required={true} />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id={`city${alt ? '-alt' : ''}`} placeholder="Town / City *" required={true} />
      </div>
      <div class="form-group">
        <input type="email" class="form-control" id={`email${alt ? '-alt' : ''}`} placeholder="Email address *" required={true} />
      </div>
    </div>
  );

  render() {
    return (
      <layout-index page-title="Checkout" description="Place your order and purchase">
        <layout-header />
        <div class="container">
          <div class="text-center">
            <h1>CHECKOUT PAGE</h1>
          </div>
          <form>
            <div class="row">
              <div class="col-4">
                <div class="form-group">
                  <span>Billing Details</span>
                </div>
                {this.renderFormAddress(false)}
              </div>
              <div class="col-4">
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" onChange={_ => this.handleDifferentAddressCheck()} id="different-address" />
                    <label class="form-check-label" htmlFor="different-address">
                      Ship to a different address
                    </label>
                  </div>
                </div>
                {this.shipToDifferent ? this.renderFormAddress(true) : null}
                <div class="form-group">
                  <textarea class="form-control" id="order-notes" placeholder="Order notes (optional)" rows={3}></textarea>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <span>Your order</span>
                </div>
                <ul class="list-group">
                  <li class="list-group-item">
                    <div class="row">
                      <div class="col-6">
                        <span>Product</span>
                      </div>
                      <div class="col-6">
                        <span>Subtotal</span>
                      </div>
                    </div>
                  </li>
                  {this.renderItems()}
                  <li class="list-group-item font-weight-bold">
                    <div class="row">
                      <div class="col-6">
                        <span>Subtotal</span>
                      </div>
                      <div class="col-6">
                        <span>{this.renderSubtotal()} €</span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="row">
                      <div class="col-6">
                        <span>Shipping</span>
                      </div>
                      <div class="col-6">
                        <span>Flat rate: {this.calculateShipping()} €</span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item font-weight-bold">
                    <div class="row">
                      <div class="col-6">
                        <span>Total</span>
                      </div>
                      <div class="col-6">
                        <span>{this.renderSubtotal() + this.calculateShipping()} €</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </layout-index>
    );
  }
}

Tunnel.injectProps(CheckoutPage, ['items']);

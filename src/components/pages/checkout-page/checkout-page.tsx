import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'checkout-page',
  styleUrl: 'checkout-page.css',
})
export class CheckoutPage {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}

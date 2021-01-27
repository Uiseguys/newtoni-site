import { Component, Prop, State, Element, h } from '@stencil/core';
import Tunnel from '../../cart/cart-data/active';
import scriptjs from 'scriptjs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { RouterHistory } from '@stencil/router';

interface MessageInterface {
  success: boolean;
  failure: boolean;
}

@Component({
  tag: 'checkout-page',
  styleUrl: 'checkout-page.scss',
})
export class CheckoutPage {
  @Element() el: CheckoutPage;
  @Prop() items: Array<any>;
  @Prop() removeAllItems: Function;
  @Prop() changeTransaction: Function;
  @Prop() history: RouterHistory;
  @State() shipToDifferent: number;
  @State() total: number;
  @State() preload: boolean;
  @State() onMessage: MessageInterface;

  private paypalButton;
  private paypalClient;

  componentWillLoad = () => {
    if (!this.items.length) this.history.push('/');
    this.preload = false;
    this.onMessage = { success: false, failure: false };
  };

  componentDidLoad = () => {
    if (!this.items.length && !this.onMessage.failure && !this.onMessage.success) {
      this.history.push('/');
      return;
    }
    this.renderPaypalButton();
  };

  componentDidUpdate = () => {
    if (!this.items.length && !this.onMessage.failure && !this.onMessage.success) {
      this.history.push('/');
      return;
    }
    if (this.items.length) this.renderPaypalButton();
  };

  renderPaypalButton = () => {
    const calculateSubtotal = this.renderSubtotal;
    const getShipping = this.calculateShipping;
    const currentItems = this.getItems;
    const clearCart = this.removeAllItems;
    const changeTransactionState = this.changeTransaction;
    const setPreload = (preloadBoolean: boolean) => (this.preload = preloadBoolean);
    const successMessage = () => (this.onMessage = { ...this.onMessage, success: true });
    const failureMessage = () => (this.onMessage = { ...this.onMessage, failure: true });

    scriptjs('https://www.paypal.com/sdk/js?client-id=AQ9HyOwBkIgsK3FdrVvF_N4NIx34DSQg8bU2J7PH0Q1K7roRnFDtcdyrXB09qwAHmX_W-uLoPq9BHQBV&currency=EUR', function () {
      window['paypal']
        .Buttons({
          createOrder: function (data, actions) {
            const subtotal = calculateSubtotal();
            const total = subtotal + getShipping();
            return axios
              .post('https://newtoni-api.herokuapp.com/paypal/create-order', {
                subtotal: `${subtotal}`,
                total: `${total}`,
                items: currentItems(),
              })
              .then(res => res.data.id);
          },
          onCancel: function (data) {},
          onShippingChange: function (data, actions) {
            if (data.shipping_address.country_code !== 'DE') return actions.reject();
            return actions.resolve();
          },
          onApprove: function (data, actions) {
            let getGeneratedRequestID = localStorage.getItem('newtoni-paypal-request-id');
            if (!getGeneratedRequestID) {
              getGeneratedRequestID = uuidv4();
              localStorage.setItem('newtoni-paypal-request-id', getGeneratedRequestID);
            }
            setPreload(true);
            return axios
              .post('https://newtoni-api.herokuapp.com/paypal/capture-order', {
                orderID: data.orderID,
                payerID: data.payerID,
                requestID: getGeneratedRequestID,
                items: currentItems(),
              })
              .then(res => {
                changeTransactionState();
                setPreload(false);
                successMessage();
                localStorage.setItem('newtoni-paypal-request-id', '');
                setTimeout(clearCart, 2000);
              });
          },
          onError: function () {
            setPreload(false);
            failureMessage();
          },
        })
        .render('#paypal-button');
    });
  };

  getItems = () =>
    this.items.map(val => ({
      name: val.name,
      description: val.description.replace(/<\/?[A-Z]+\s?\/?>/gi, ''),
      quantity: `${val.quantity}`,
      //category: val.type == 'editions' ? 'EDITIONS' : 'PUBLICATIONS',
      price: `${val.price}`,
      unit_amount: {
        currency_code: 'EUR',
        value: `${val.price}`,
      },
      tax: {
        currency_code: 'EUR',
        value: '0',
      },
      sku: '',
    }));

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

  handleMessageFailure = () => {
    this.onMessage = { ...this.onMessage, failure: false };
  };

  handleMessageSuccess = () => {
    this.history.push('/');
  };

  render() {
    return (
      <layout-index page-title="Checkout" description="Place your order and purchase">
        <div class={`message-overlay${this.onMessage.failure || this.onMessage.success ? '' : ' hide'}`}>
          <div class={`row${this.onMessage.failure ? '' : ' hide'}`}>
            <div class={`alert col-8 offset-2 mt-5 alert-danger`} role="alert">
              Your transaction has been unsuccessful, please try again later{' '}
              <button class="btn p-0" onClick={_ => this.handleMessageFailure()}>
                x
              </button>
            </div>
          </div>
          <div class={`row${this.onMessage.success ? '' : ' hide'}`}>
            <div class={`alert col-8 offset-2 mt-2 alert-success`} role="alert">
              Thank you your transaction has been processed successfully{' '}
              <button onClick={_ => this.handleMessageSuccess()} class="btn p-0">
                x
              </button>
            </div>
          </div>
        </div>
        <div class={`preload-overlay${!this.preload ? ' hide' : ''}`}>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <layout-header />
        <div class="container">
          <div class="text-center">
            <h1>CHECKOUT PAGE</h1>
          </div>
          <div class="row">
            <div class="col-6 offset-3">
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
                    <div class="col-12 pt-3">
                      <div key={uuidv4()} id="paypal-button" ref={el => (this.paypalButton = el as HTMLDivElement)}></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </layout-index>
    );
  }
}

Tunnel.injectProps(CheckoutPage, ['items', 'removeAllItems', 'changeTransaction']);

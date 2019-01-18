import React from "react";
import { connect } from "react-redux";
import { navigateTo } from "gatsby-link";

import SubpageHeader from "../components/SubpageHeader";
import Cart from "../components/Cart";

const windowGlobal = typeof window !== "undefined" && window;
const CHECKOUT_URL = "https://dannygrassow-api.herokuapp.com/payment/checkout";
// const CHECKOUT_URL =
// 'https://calm-cliffs-35577.herokuapp.com/payment/checkout'
class Checkout extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    // console.log(this.props)
    // console.log(form)
    // console.log(data)
    let formBody = [];
    for (let name of data.keys()) {
      // console.log(name, data.get(name))
      let encodedKey = encodeURIComponent(name);
      let encodedValue = encodeURIComponent(data.get(name));
      formBody.push(encodedKey + "=" + encodedValue);
    }

    let items = this.props.items.map((item, index) => {
      formBody.push(
        encodeURIComponent(`items[${index}][name]`) +
          "=" +
          encodeURIComponent(
            `${item.packaging &&
              (item.packaging.displayName ||
                item.packaging.measure + item.packaging.unitOfMeasure)} ${
              item.name
            } ${item.varietal}`
          )
      );
      formBody.push(
        encodeURIComponent(`items[${index}][price]`) +
          "=" +
          encodeURIComponent(item.price.toFixed(2))
      );
      formBody.push(
        encodeURIComponent(`items[${index}][quantity]`) +
          "=" +
          encodeURIComponent(item.quantity)
      );
      formBody.push(
        encodeURIComponent(`items[${index}][currency]`) +
          "=" +
          encodeURIComponent("EUR")
      );
      formBody.push(
        encodeURIComponent(`items[${index}][packaging]`) +
          "=" +
          JSON.stringify(item.packaging)
      );
      formBody.push(
        encodeURIComponent(`items[${index}][varietal]`) +
          "=" +
          encodeURIComponent(item.varietal)
      );
      formBody.push(
        encodeURIComponent(`items[${index}][wineId]`) +
          "=" +
          encodeURIComponent(item.id)
      );
    });

    formBody.push(
      encodeURIComponent(`shipping`) +
        "=" +
        encodeURIComponent(this.props.shipping.toFixed(2))
    );
    formBody.push(
      encodeURIComponent(`subtotal`) +
        "=" +
        encodeURIComponent(this.props.total.toFixed(2))
    );
    formBody.push(
      encodeURIComponent(`total`) +
        "=" +
        encodeURIComponent(this.props.grandTotal.toFixed(2))
    );

    formBody = formBody.join("&");

    fetch(CHECKOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: formBody
    })
      .then(res => res.json())
      .then(res => {
        this.props.clear();
        windowGlobal && (document.location.href = res.href);
      })
      .catch(e => {
        this.props.clear();
        navigateTo("/danke");
      });
  }

  reset() {
    console.log("reset");
  }

  render() {
    return (
      <div className="content-container">
        <div className="checkout">
          <SubpageHeader />

          <Cart checkout={true} />

          <form onSubmit={this.handleSubmit} id="appnavigation">
            <p>
              Bitte beachten Sie bei Ihrer Bestellung: Wir liefern in{" "}
              <strong>6</strong>er, <strong>12</strong>er oder{" "}
              <strong>18</strong>er Kartons!
              <br />
              <br />
            </p>
            <fieldset className="personal">
              <legend>Ihre Daten:</legend>

              <div className="form-group">
                <label htmlFor="realname">
                  Name:
                  <span className="hint">*</span>
                </label>
                <input
                  type="text"
                  id="realname"
                  name="realname"
                  className="required form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">
                  Stra&szlig;e, Haus-Nr:
                  <span className="hint">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="required form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">
                  PLZ:
                  <span className="hint">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  className="required form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">
                  Wohnort:
                  <span className="hint">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="required form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" id="email">
                  Email:
                  <span className="hint">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="required email form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  Telefon (optional, bei evtl. Rückfragen):
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-check">
                <label className="form-check-label" htmlFor="agreement-1">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    required
                    id="agreement-1"
                    name="agreement[1]"
                    value="1"
                  />
                  Ich habe die{" "}
                  <a href="/agb" target="_blank">
                    AGB
                  </a>{" "}
                  und die Informationen zum{" "}
                  <a href="/datenschutz" target="_blank">
                    Datenschutz
                  </a>{" "}
                  gelesen und akzeptiert.
                </label>
                <br />
              </div>

              <div className="form-check">
                <label className="form-check-label" htmlFor="agreement-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    required
                    id="agreement-2"
                    name="agreement[3]"
                    value="1"
                  />
                  Ich bestätige, dass ich volljährig bin
                </label>
                <br />
                <br />
              </div>

              <div className="form-group">
                <label htmlFor="message">Bemerkungen:</label>
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                />
              </div>

              <p>
                <br />
                <br />
                <strong>Keine Abgabe an Jugendliche unter 18Jahren.</strong>
                <br />
                <br />
              </p>
              {/* <p>
                <label>
                  <input type='radio' name='pay_method' value='invoice' checked />Invoice
                </label>
                <label style={{ marginLeft: '20px' }}>
                  <input type='radio' name='pay_method' value='paypal' />Paypal
                </label>
              </p> */}
              <div className="form-group">
                <input
                  type="reset"
                  value="Zurück"
                  className="btn btn-link btn-secondary"
                  onClick={this.reset}
                />

                <input
                  type="submit"
                  name="button"
                  id="submitter"
                  className="btn btn-lg btn-primary"
                  value="Bestellung abschicken"
                />
                <input
                  type="reset"
                  value="Zur&uuml;cksetzen"
                  id="order"
                  className="hidden"
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

// export default Checkout

const mapStateToProps = ({ count, items, shipping, total, grandTotal }) => {
  return { count, items, shipping, total, grandTotal };
};

const mapDispatchToProps = dispatch => {
  return {
    clear: () => dispatch({ type: "CLEAR" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

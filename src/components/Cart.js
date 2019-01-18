import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CartItem = ({ item, add, remove }) => (
  <div className="itemRow">
    <div className="item-decrement">
      <a onClick={() => remove(item, 1)}> - </a>
    </div>
    <div className="item-quantity">{item.quantity}</div>
    <div className="item-increment">
      <a onClick={() => add(item, 1)}>+</a>
    </div>
    <div className="item-systemname">
      {item.content}l {item.name}
    </div>
    <div className="item-price">€{item.price.toFixed(2)}</div>
    <div className="item-total">€{item.total.toFixed(2)}</div>
    <div className="item-remove">
      <a className="cart-anchor" onClick={() => remove(item, item.quantity)}>
        X
      </a>
    </div>
  </div>
);

const Cart = ({
  checkout,
  count,
  shipping,
  total,
  grandTotal,
  items,
  add,
  remove,
  clear
}) =>
  count > 0 && (
    <div
      className={"cart " + (checkout ? "checkout" : "")}
      role="button"
      ref={c => {
        if (c) {
          c.addEventListener("click", () => {
            return true;
          });
        }
      }}
    >
      <div className="summary">
        <div className="quantity simpleCart_quantity">{count}</div>
        <span className="icon-i_basket" />
        <div className="grand-total simpleCart_grandTotal">
          €{grandTotal.toFixed(2)}
        </div>
      </div>

      <div className="details">
        <a className="empty-cart simpleCart_empty cart-anchor" onClick={clear}>
          X Korb leeren
        </a>

        <div className="cart-items">
          <div className="simpleCart_items">
            <div>
              {items.map((item, index) => (
                <CartItem item={item} key={index} add={add} remove={remove} />
              ))}
            </div>
          </div>
        </div>

        <div className="simpleCart_total">€{total.toFixed(2)}</div>

        <div className="simpleCart_quantity">{count}</div>

        <div className="simpleCart_shipping">€{shipping.toFixed(2)}</div>

        <div className="simpleCart_grandTotal">€{grandTotal.toFixed(2)}</div>

        <div className="checkout-button">
          <a href="../checkout">> Bestellen</a>
        </div>
      </div>
    </div>
  );

Cart.propTypes = {
  count: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  grandTotal: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = ({ count, items, shipping, total, grandTotal }) => {
  return { count, items, shipping, total, grandTotal };
};

const mapDispatchToProps = dispatch => {
  return {
    add: (item, quantity = 1) =>
      dispatch({ type: "ADD", payload: { item, quantity } }),
    remove: (item, quantity = 1) =>
      dispatch({ type: "REMOVE", payload: { item, quantity } }),
    clear: () => dispatch({ type: "CLEAR" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

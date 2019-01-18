import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Counter = ({ count, items, increment }) => (
  <div className="cart">
    <p>Count: {count}</p>
    <p>Items: {items.length}</p>
    <button onClick={increment}>Increment</button>
  </div>
);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired
};

const mapStateToProps = ({ count, items }) => {
  return { count, items };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: `ADD`, payload: { quantity: 2 } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

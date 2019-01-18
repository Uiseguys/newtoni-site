import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddToCart extends React.Component {
  render() {
    const { add, item } = this.props;
    return (
      <div className="shop-link">
        <div className="input">
          <input
            type="text"
            defaultValue="1"
            className="item_Quantity"
            ref="quant"
          />
          <br />
        </div>
        <div className="button">
          <a
            className="item_add"
            href="javascript:;"
            onClick={() => add(+this.refs.quant.value, item)}
          >
            <span className="icon-i_basket" />
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => {
  return {
    add: (quantity = 1, item) =>
      dispatch({ type: `ADD`, payload: { quantity, item } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);

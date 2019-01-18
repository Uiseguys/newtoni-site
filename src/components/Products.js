import React from "react";

import Product from "./Product";

export default ({ products }) => (
  <div className="product-list">
    {products ? (products
      .sort(function (a, b) {
        return a.priority - b.priority;
      }))
      .map((product, index) => <Product product={product} key={index} />) :null}
  </div>
);

import React from "react";
import accounting from "accounting";
import AddToCart from "./AddToCart";
import AwwardBadge from "./AwardBadge";

const onWineChange = product => {};

const priceInt = price => Math.floor(price);
const priceDecimals = price => Math.round((price - priceInt(price)) * 100);

const PriceInt = ({ price }) => (
  <span className="price__int">{priceInt(price)}</span>
);

const PriceDec = ({ price }) => (
  <span className="price__decimals">
    {priceDecimals(price) ? priceDecimals(price) : "00"}
  </span>
);
const NotAvailableMessage = ({ availability }) => (
  <span>
    {availability ? "" : "Ausgetrunken. Ab September wieder verfügbar"}
  </span>
);

export default ({ product }) => (
  <div className="simpleCart_shelfItem c-rudra">
    <div className="image">
      <a>
        <img src={product.image} />
      </a>
    </div>


    <div className="description">
      <div>
        <h4 className="item_name">{product.name ? product.name : product.varietal}</h4>
        {product.availability && <AddToCart item={product} />}

        {product.availability && (
          <div className="product">

            <span className="c-price">
              <PriceInt price={product.price} />
              <PriceDec price={product.price} />
            </span>
          </div>
        )}
        <NotAvailableMessage availability={product.availability} />
      </div>
    </div>
  </div>
);

import React from "react";
import Link from "gatsby-link";
import { logo } from "../assets";

const ProductLink = ({ to, title, location }) => (
  <div className={location.pathname.startsWith(to) ? "active" : ""}>
    <Link to={to}>
      <span>
        <h6>{title}</h6>
        <span className="path1" />
        <span className="path2" />
      </span>
    </Link>
  </div>
);

export default ({ location }) => (
  <div>
    <nav className="product-navigation">
      <div className="dropdown">
        <button className="dropbtn">Products Types</button>
        <div className="dropdown-content">

          <ProductLink to="/artist-books" location={location} title="Artist Books" />
          <ProductLink to="/magazine" location={location} title="Magazine" />
          <ProductLink to="/photography" location={location} title="Photography" />
          <ProductLink to="/graphic" location={location} title="Graphic" />
        </div>
      </div>


    </nav>
  </div>
);

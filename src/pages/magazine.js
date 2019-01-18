import React from "react";

import SubpageHeader from "../components/SubpageHeader";
import ProductNavigation from "../components/ProductNavigation";
import Products from "../components/Products";

import { ProductFragment } from "../fragments";
import { filterPremium } from "../util";

export default ({ location, data }) => (
  <div className="content-container">
    <SubpageHeader />

    <ProductNavigation location={location} />

    <h2>Magazine</h2>
    {data && data.allWine ?
      (<Products products={data.allWine.edges.map(edge => edge.node)} />)
      : (
        <div>
          <h3>We don't have any Magazine product.</h3>
      </div>)
    }
  </div>
);

export const query = graphql`
  query WhiteProductQuery {
    allWine(filter: { type: { eq: "Magazine" } }) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

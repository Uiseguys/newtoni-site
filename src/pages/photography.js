import React from "react";

import SubpageHeader from "../components/SubpageHeader";
import ProductNavigation from "../components/ProductNavigation";
import Products from "../components/Products";
import { ProductFragment } from "../fragments";

export default ({ location, data }) => (
  <div className="content-container">
    <SubpageHeader />

    <ProductNavigation location={location} />

    <h2>Photography</h2>
    {data && data.allWine ?
      (<Products products={data.allWine.edges.map(edge => edge.node)} />)
      : (
        <div>
          <h3>We don't have any Photography product.</h3>
      </div>)
    }

  </div>
);

export const query = graphql`
  query RoseProductQuery {
    allWine(filter: { type: { eq: "Photography" } }) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

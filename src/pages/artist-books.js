import React from "react";

import SubpageHeader from "../components/SubpageHeader";
import ProductNavigation from "../components/ProductNavigation";
import Products from "../components/Products";
// import { ProductFragment } from '../fragments'
import { filterPremium } from "../util";

export default ({ location, data }) => (
  <div className="content-container">
    <SubpageHeader />

    <ProductNavigation location={location} />

    <h2>Artist Books</h2>
    {data && data.allWine ?
      (<Products products={data.allWine.edges.map(edge => edge.node)} />)
      : (
        <div>
          <h3>We don't have any Artist Books product.</h3>
        </div>)
    }
  </div>
);

export const query = graphql`
  query RedProductQuery {
    allWine(filter: { type: { eq: "Artist-Books" } }) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

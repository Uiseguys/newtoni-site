/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Fragment } from "react"
import PropTypes from "prop-types"

// Imports of the header
import Footer from "./footer"

// Import Layout Styles
import "../scss/pages/layout.scss"

const Layout = ({ children }) => {
  return (
    <Fragment>
      {children}
      <Footer />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import SvgImage from "../components/svg-image"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      svgFinder: file(relativePath: { eq: "newtoni.svg" }) {
        publicURL
      }
    }
  `)

  return (
    <footer>
      <SvgImage
        url={data.svgFinder.publicURL}
        svgClassName={"svg-image-container"}
        svghw={["10%", "100%"]}
        imghw={["80%", "80%"]}
      />
      © copyright {new Date().getFullYear()} New toni Press
    </footer>
  )
}

export default Footer

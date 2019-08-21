import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import SvgImage from "../components/svg-image"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      svgFinder: file(relativePath: { eq: "newtoni.svg" }) {
        publicURL
      }
    }
  `)

  return (
    <header>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <Link to="/">
          <SvgImage
            url={data.svgFinder.publicURL}
            svgClassName={"svg-image-container"}
            imghw={["80%", "80%"]}
            imgxy={["10%", "0"]}
          />
        </Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

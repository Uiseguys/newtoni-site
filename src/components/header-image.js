import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { PropTypes } from "prop-types"
import Img from "gatsby-image"

/*
 * Custom Image Coponent that takes on a filename and
 * className as props
 */
PropTypes

const Image = ({ name, imgClassName }) => {
  const data = useStaticQuery(graphql`
    query {
      imageFinder: file(relativePath: { eq: "${name}" }) {
        publicURL
      }
    }
  `)

  return <img src={data.publicURL} className={imgClassName} />
}

Image.propTypes = {
  name: PropTypes.string,
  imgClassName: PropTypes.string,
}

export default Image

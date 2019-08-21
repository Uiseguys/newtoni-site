import React from "react"
import { PropTypes } from "prop-types"

/*
 * Custom Image Coponent that takes on a filename and
 * className as props
 */

const SvgImage = ({ url, svgClassName, svghw, imghw }) => {
  return (
    <svg
      id="circle"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={svgClassName}
      height={svghw[0]}
      width={svghw[1]}
    >
      <image
        x="0"
        y="0"
        align="center"
        height={imghw[0]}
        width={imghw[1]}
        xlinkHref={url}
      />
    </svg>
  )
}

SvgImage.propTypes = {
  url: PropTypes.string,
  svgClassName: PropTypes.string,
  svghw: PropTypes.array, // height/width of the SVG container
  imghw: PropTypes.array, // height/width of the image element
}

export default SvgImage

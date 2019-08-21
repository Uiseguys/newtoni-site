import React from "react"
import { PropTypes } from "prop-types"

/*
 * Custom SVG Image Component that takes on a url, className, an array
 * of image height and image width, as well as an image array of
 * x and y positions as props
 */

const SvgImage = ({ url, svgClassName, imghw, imgxy }) => {
  return (
    <svg
      id="circle"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={svgClassName}
    >
      <image
        x={imgxy[0]}
        y={imgxy[1]}
        align="center"
        height={imghw[0]}
        width={imghw[1]}
        xlinkHref={url}
      />
    </svg>
  )
}

// Ensures the image is at the top left of its SVG container
SvgImage.defaultProps = {
  imgxy: ["0", "0"],
}

SvgImage.propTypes = {
  url: PropTypes.string, // URL to SVG element
  svgClassName: PropTypes.string, // class name of the SVG element
  imghw: PropTypes.array, // height/width of the image element
  imgxy: PropTypes.array, // x and y positions of the image
}

export default SvgImage

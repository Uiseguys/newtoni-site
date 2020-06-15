import React, { useMemo } from "react"
import crypto from "crypto"
import { Image, Transformation } from "cloudinary-react"

import "../scss/pages/posts-page.scss"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PostPage = ({ pageContext }) => {
  const postImages = useMemo(
    () =>
      pageContext.image.map((item, index) => {
        if (item) {
          return (
            <figure
              className="rellax"
              key={crypto.randomBytes(6).toString("hex")}
            >
              <Image cloudName="schneckenhof" publicId={item} secure="true">
                <Transformation width="auto:100" crop="scale"></Transformation>
              </Image>
              <figcaption className="rellax">
                {pageContext.title || pageContext.name}
              </figcaption>
            </figure>
          )
        }
        return null
      }),
    [pageContext.image]
  )

  const rellaxStyles = useMemo(() => {
    const widthMap = new Map()
    widthMap.set(1, "100vw")
    widthMap.set(2, "100vw 100vw")
    widthMap.set(3, "100vw 100vw 100vw")
    widthMap.set(4, "100vw 100vw 100vw 100vw")
    widthMap.set(5, "100vw 100vw 100vw 100vw 100vw 100vw")
    widthMap.set(6, "100vw 100vw 100vw 100vw 100vw 100vw 100vw")
    let stylesObj = {}
    if (pageContext.image.length > 0) {
      stylesObj["width"] = `${pageContext.image.length * 100}vw`
      stylesObj["gridTemplateColumns"] = widthMap.get(pageContext.image.length)
    } else {
      stylesObj["width"] = "100vw"
      stylesObj["gridTemplateColumns"] = "100vw"
    }
    return stylesObj
  }, [pageContext.image])

  return (
    <Layout>
      <aside className="helper">Scroll Sideways</aside>
      <SEO title={pageContext.title || pageContext.name} />
      <header className="post-page">
        <div style={rellaxStyles}>{postImages}</div>
      </header>
      <main className="container">
        <div className="row">
          <section className="col-6">
            <div
              dangerouslySetInnerHTML={{
                __html: pageContext.post || pageContext.description,
              }}
            ></div>
          </section>
          <section className="col-6"></section>
        </div>
      </main>
    </Layout>
  )
}

export default PostPage

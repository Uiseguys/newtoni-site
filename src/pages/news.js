import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"
import Header from "../components/header"
import "../scss/pages/posts-home.scss"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Image, Transformation } from "cloudinary-react"

const NewsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allNews {
        edges {
          node {
            id
            title
            image
            slug
          }
        }
      }
      postHomeScroll: file(ext: { eq: ".js" }, name: { eq: "postHomeScroll" }) {
        publicURL
      }
    }
  `)

  const newsImages = useMemo(() => {
    const arr = data.allNews.edges
    return arr.map((item, index) => {
      const imgArr = item.node.image ? JSON.parse(item.node.image) : []
      return imgArr.map((item, index) => {
        if (item) {
          return (
            <Image
              key={crypto.randomBytes(6).toString("hex")}
              cloudName="schneckenhof"
              publicId={item}
              secure="true"
            >
              <Transformation
                width="auto"
                height="182"
                crop="scale"
              ></Transformation>
            </Image>
          )
        }
        return null
      })
    })
  }, [data.allNews.edges])

  const renderNewsPosts = useMemo(() => {
    const arr = data.allNews.edges
    return arr.map((item, index) => {
      return (
        <li
          className="col-sm-12 col-md-6 col-lg-4"
          key={crypto.randomBytes(6).toString("hex")}
        >
          <figure>
            <a href={item.node.slug}>{newsImages[index]}</a>
            <figcaption>{item.node.title}</figcaption>
          </figure>
        </li>
      )
    })
  }, [data.allNews.edges])

  // postsHomeScroll()

  return (
    <Layout>
      <SEO title="News" />
      <nav>
        <span id="news">
          N<br />e<br />w<br />s
        </span>
      </nav>
      <Header />
      <main className="container">
        <div className="row">
          <h1 className="col-4 offset-3">Latest News</h1>
        </div>
        <ul className="row">{renderNewsPosts}</ul>
      </main>
      <script src={data.postHomeScroll.publicURL}></script>
    </Layout>
  )
}

export default NewsPage

import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"
import Header from "../components/header"
import "../scss/pages/posts-home.scss"
// import { postsHomeScroll } from "../js/scroll"
import { Image, Transformation } from "cloudinary-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PublicationsPage = () => {
  const data = useStaticQuery(graphql`
    {
      allPublications {
        edges {
          node {
            image
            name
            slug
          }
        }
      }
      postHomeScroll: file(ext: { eq: ".js" }, name: { eq: "postHomeScroll" }) {
        publicURL
      }
    }
  `)

  const publicationImages = useMemo(() => {
    const arr = data.allPublications.edges
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
  }, [data.allPublications.edges])

  const renderPublicationsPosts = useMemo(() => {
    const arr = data.allPublications.edges
    return arr.map((item, index) => {
      return (
        <li
          className="col-sm-12 col-md-6 col-lg-4"
          key={crypto.randomBytes(6).toString("hex")}
        >
          <figure>
            <a href={item.node.slug}>{publicationImages[index]}</a>
            <figcaption>{item.node.name}</figcaption>
          </figure>
        </li>
      )
    })
  }, [data.allPublications.edges])

  // postsHomeScroll()

  return (
    <Layout>
      <SEO title="Publications" />
      <nav>
        <span id="publications">
          P<br />u<br />b<br />l<br />i<br />c<br />a<br />t<br />i<br />o<br />
          n<br />s
        </span>
      </nav>
      <Header />
      <main className="container">
        <div className="row">
          <h1 className="col-4 offset-3">Latest Publications</h1>
        </div>
        <ul className="row">{renderPublicationsPosts}</ul>
      </main>
      <script src={data.postHomeScroll.publicURL}></script>
    </Layout>
  )
}

export default PublicationsPage

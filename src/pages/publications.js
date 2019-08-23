import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"
import Header from "../components/header"
import "../scss/pages/posts-home.scss"
import { postsHomeScroll } from "../js/scroll"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PublicationsPage = () => {
  const data = useStaticQuery(graphql`
    {
      publicationsPosts: allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
        filter: { frontmatter: { type: { eq: "publication" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              date(fromNow: true)
              author
            }
            fields {
              slug
            }
          }
        }
      }
      publicationsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "publications-images" } }
      ) {
        nodes {
          name
          publicURL
        }
      }
    }
  `)

  const randomCryptoKey = arr => {
    let keyArr = []
    for (let i = 0; i < arr.length; i++) {
      keyArr[i] = crypto.randomBytes(6).toString("hex")
    }
    return keyArr
  }

  const renderPublicationsPosts = () => {
    const arr = data.publicationsPosts.edges
    // Image Array Nodes
    const imgArr = data.publicationsImageNodes.nodes
    const keyArr = randomCryptoKey(arr)
    return arr.map((item, index) => {
      return (
        <li className="col-6 offset-3" key={keyArr[index]}>
          <figure>
            <div className="img-container">
              <img src={imgArr[index].publicURL} />
            </div>
            <figcaption>
              <a href={item.node.fields.slug}>
                <i>{item.node.frontmatter.title}</i>
              </a>
              <br />
              <small>{item.node.frontmatter.author}</small>
              <br />
              <small>{item.node.frontmatter.date}</small>
              <br />
            </figcaption>
          </figure>
        </li>
      )
    })
  }

  postsHomeScroll()

  return (
    <Layout>
      <SEO title="News" />
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
        <ul className="row">{renderPublicationsPosts()}</ul>
      </main>
    </Layout>
  )
}

export default PublicationsPage

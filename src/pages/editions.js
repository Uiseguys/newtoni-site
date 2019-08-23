import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import crypto from "crypto"
import Header from "../components/header"
import "../scss/pages/posts-home.scss"
import { postsHomeScroll } from "../js/scroll"

import Layout from "../components/layout"
import SEO from "../components/seo"

const EditionsPage = () => {
  const data = useStaticQuery(graphql`
    {
      editionsPosts: allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
        filter: { frontmatter: { type: { eq: "edition" } } }
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
      editionsImageNodes: allFile(
        filter: { relativeDirectory: { eq: "news-images" } }
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

  const renderEditionsPosts = () => {
    const arr = data.editionsPosts.edges
    // Image Array Nodes
    const imgArr = data.editionsImageNodes.nodes
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
        <span id="editions">
          E<br />d<br />i<br />t<br />i<br />o<br />n<br />s
        </span>
      </nav>
      <Header />
      <main className="container">
        <div className="row">
          <h1 className="col-4 offset-3">Latest Editions</h1>
        </div>
        <ul className="row">{renderEditionsPosts()}</ul>
      </main>
    </Layout>
  )
}

export default EditionsPage
